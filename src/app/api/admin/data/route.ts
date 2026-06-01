import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

const FILE_NAME = 'math-learning-results.json';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.password;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return NextResponse.json({ error: 'No blob token found' }, { status: 501 });

    const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
    if (blobs.length === 0) return NextResponse.json([]);
    
    const res = await fetch(blobs[0].url);
    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch blob data' }, { status: 500 });
    }
    const data = await res.json();
    
    // Sort data from newest to oldest
    const sortedData = data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json(sortedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
