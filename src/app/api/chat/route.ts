import { NextResponse } from 'next/server';

async function query(data: { question: string }) {
  const flowiseApiUrl = process.env.FLOWISE_API_URL;
  
  if (!flowiseApiUrl) {
    throw new Error('FLOWISE_API_URL is not defined in environment variables');
  }

  const response = await fetch(flowiseApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await query({ question: message });
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error processing your request' }, 
      { status: 500 }
    );
  }
}
