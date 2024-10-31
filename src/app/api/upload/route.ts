import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import mammoth from 'mammoth';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // Word document
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (file.type === 'text/plain') {
    // Plain text file
    return buffer.toString('utf-8');
  } else {
    throw new Error('Unsupported file type. Please upload a .docx or .txt file.');
  }
}

async function getEmbedding(text: string, model = "text-embedding-3-small"): Promise<number[]> {
  text = text.replace(/\n/g, " ");
  const response = await openai.embeddings.create({
    input: [text],
    model: model,
  });
  return response.data[0].embedding;
}

async function upsertEmbeddings(index: any, docId: string, embedding: number[]): Promise<void> {
  await index.upsert([{ id: docId, values: embedding }]);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File type:', file.type);
    console.log('File name:', file.name);

    const text = await extractTextFromFile(file);
    
    console.log('Extracted text length:', text.length);

    const embeddings = await getEmbedding(text);
    
    const index = pinecone.index('resumerag'); // Use your actual index name
    const docId = file.name || "uploaded_document";
    
    await upsertEmbeddings(index, docId, embeddings);

    return NextResponse.json({ message: `Successfully upserted embeddings for ${docId}` }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file: ' + (error as Error).message }, { status: 500 });
  }
}
