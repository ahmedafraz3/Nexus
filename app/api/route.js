// app/api/logError/route.js

export async function POST(request) {
    const body = await request.json();
    const { error } = body;
  
    console.error('Logged Error:', error);
    // Optionally: send to a logging service
  
    return new Response(JSON.stringify({ message: 'Error logged successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  