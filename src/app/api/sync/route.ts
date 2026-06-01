import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

const FILE_NAME = 'math-learning-results.json';

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'No token found' }, { status: 501 });

  try {
    const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
    if (blobs.length === 0) return NextResponse.json([]);
    const res = await fetch(blobs[0].downloadUrl);
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
      const res = await fetch(blobs[0].downloadUrl);
      if (res.ok) {
        existingData = await res.json();
      }
      await del(blobs[0].url, { token });
    }
    
    // Append or replace new record
    if (newRecord.type === 'image_upload' && newRecord.chapterId) {
      const existingIdx = existingData.findIndex((r: any) => r.type === 'image_upload' && r.chapterId === newRecord.chapterId);
      if (existingIdx > -1) {
        existingData[existingIdx].imageUrls = newRecord.imageUrls;
        existingData[existingIdx].timestamp = new Date().toISOString();
      } else {
        existingData.push({ id: Date.now().toString(), timestamp: new Date().toISOString(), ...newRecord });
      }
    } else if (newRecord.type === 'essay' && newRecord.chapterId && newRecord.essayIndex !== undefined) {
      const existingIdx = existingData.findIndex((r: any) => r.type === 'essay' && r.chapterId === newRecord.chapterId && r.essayIndex === newRecord.essayIndex);
      if (existingIdx > -1) {
        existingData[existingIdx].studentAnswer = newRecord.studentAnswer;
        existingData[existingIdx].timestamp = new Date().toISOString();
      } else {
        existingData.push({ id: Date.now().toString(), timestamp: new Date().toISOString(), ...newRecord });
      }
    } else {
      existingData.push({ id: Date.now().toString(), timestamp: new Date().toISOString(), ...newRecord });
    }

    let blob;
    try {
      blob = await put(FILE_NAME, JSON.stringify(existingData), {
        access: 'public',
        addRandomSuffix: false,
        token,
        contentType: 'application/json',
      });
    } catch (e: any) {
      if (e.message?.includes('private store')) {
        blob = await put(FILE_NAME, JSON.stringify(existingData), {
          access: 'private',
          addRandomSuffix: false,
          token,
          contentType: 'application/json',
        });
      } else {
        throw e;
      }
    }

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
