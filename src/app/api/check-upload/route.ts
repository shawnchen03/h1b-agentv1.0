import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return NextResponse.json({ error: 'No file name provided' }, { status: 400 });
  }

  if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
    return NextResponse.json(
      { error: 'Missing required Pinecone configuration' },
      { status: 500 }
    );
  }

  try {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT as string
    });

    const index = pc.index(process.env.PINECONE_INDEX_NAME);
    const queryResponse = await index.fetch([fileName]);

    // Check if the record exists in the response
    if (queryResponse.records && queryResponse.records[fileName]) {
      return NextResponse.json({ 
        exists: true, 
        vector: queryResponse.records[fileName].values 
      });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking Pinecone:', error);
    return NextResponse.json({ error: 'Error checking Pinecone' }, { status: 500 });
  }
}
