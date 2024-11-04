import { NextResponse } from 'next/server';

async function query(data: { question: string }) {
  const flowiseApiUrl = process.env.FLOWISE_API_URL;
  
  if (!flowiseApiUrl) {
    throw new Error('FLOWISE_API_URL is not defined in environment variables');
  }

  console.log('Calling Flowise API at:', flowiseApiUrl);
  
  try {
    const response = await fetch(flowiseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Flowise API error:', {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Flowise API response:', result);
    return result;
  } catch (error) {
    console.error('Error in query function:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);
    
    const response = await query({ question: message });
    
    return NextResponse.json({
      text: response.text || response.message || response,
      status: 'success'
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { 
        error: 'Error processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
