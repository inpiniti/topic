import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: NextRequest) {
  console.log('GET /api/test', request);

  // Create an HTTPS agent that ignores self-signed certificates
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await new Promise((resolve, reject) => {
      https
        .get(
          'https://jsonplaceholder.typicode.com/todos/1',
          { agent: httpsAgent },
          (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
              resolve({
                ok: res.statusCode === 200,
                status: res.statusCode,
                json: async () => JSON.parse(data),
              });
            });
          }
        )
        .on('error', reject);
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/test:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
