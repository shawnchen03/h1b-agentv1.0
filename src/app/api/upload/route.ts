import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import mammoth from 'mammoth';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let pinecone: Pinecone;
try {
  pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
  });
} catch (error) {
  console.error('Error initializing Pinecone:', error);
  throw new Error('Failed to initialize Pinecone client');
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (file.type === 'text/plain') {
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
  await index.upsert([{
    id: docId,
    values: embedding,
    metadata: { timestamp: new Date().toISOString() }
  }]);
}

export async function POST(req: NextRequest) {
  if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_INDEX_NAME) {
    return NextResponse.json(
      { error: 'Missing required environment variables for Pinecone' },
      { status: 500 }
    );
  }

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
    
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
    const docId = file.name || "uploaded_document";
    
    await upsertEmbeddings(index, docId, embeddings);

    return NextResponse.json(
      { message: `Successfully upserted embeddings for ${docId}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
