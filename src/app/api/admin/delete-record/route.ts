import { v2 as cloudinary } from 'cloudinary';
import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FILE_NAME = 'math-learning-results.json';

export async function POST(request: Request) {
  try {
    const { recordId } = await request.json();

    if (!recordId) {
      return NextResponse.json({ error: 'Missing recordId' }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Missing blob token' }, { status: 500 });
    }

    let existingData: any[] = [];
    const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
    
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      if (res.ok) {
        existingData = await res.json();
      }
      await del(blobs[0].url, { token });
    }
    
    const recordIndex = existingData.findIndex((r) => r.id === recordId);
    if (recordIndex !== -1) {
      const record = existingData[recordIndex];
      
      // Delete images from cloudinary
      if (record.imageUrls && record.imageUrls.length > 0) {
        for (const imageUrl of record.imageUrls) {
          try {
            const parts = imageUrl.split('/upload/');
            if (parts.length === 2) {
              const pathWithoutVersion = parts[1].replace(/^v\d+\//, ''); 
              const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");
              await cloudinary.uploader.destroy(publicId);
            }
          } catch (err) {
            console.error('Error deleting image:', err);
          }
        }
      }

      existingData.splice(recordIndex, 1);
    }

    try {
      await put(FILE_NAME, JSON.stringify(existingData), {
        access: 'public',
        addRandomSuffix: false,
        token,
        contentType: 'application/json',
      });
    } catch (e: any) {
      if (e.message?.includes('private store')) {
        await put(FILE_NAME, JSON.stringify(existingData), {
          access: 'private',
          addRandomSuffix: false,
          token,
          contentType: 'application/json',
        });
      } else {
        throw e;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
