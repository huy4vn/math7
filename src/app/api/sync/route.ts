import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

const FILE_NAME = 'math-learning-results.json';

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'No token found' }, { status: 501 });

  try {
    const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
    if (blobs.length === 0) return NextResponse.json([]);
    const res = await fetch(blobs[0].url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'No token found' }, { status: 501 });

  try {
    const newRecord = await request.json();
    
    // Fetch existing
    let existingData: any[] = [];
    const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
    
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      if (res.ok) {
        existingData = await res.json();
      }
      await del(blobs[0].url, { token });
    }
    
    // Append new record
    existingData.push({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...newRecord
    });

    const blob = await put(FILE_NAME, JSON.stringify(existingData), {
      access: 'public',
      addRandomSuffix: false,
      token,
      contentType: 'application/json',
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
