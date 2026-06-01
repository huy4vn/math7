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
    const { recordId, imageUrl } = await request.json();

    if (!recordId || !imageUrl) {
      return NextResponse.json({ error: 'Missing recordId or imageUrl' }, { status: 400 });
    }

    // 1. Delete from Cloudinary
    // Example URL: https://res.cloudinary.com/dowobggqv/image/upload/v1780289190/math-revision/chuong-1/zjfuqlwot1gsxek30cxb.png
    const parts = imageUrl.split('/upload/');
    if (parts.length === 2) {
      const pathWithoutVersion = parts[1].replace(/^v\d+\//, ''); 
      const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, ""); // remove extension
      await cloudinary.uploader.destroy(publicId);
    }

    // 2. Update Vercel Blob JSON
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      let existingData: any[] = [];
      const { blobs } = await list({ prefix: FILE_NAME, limit: 1, token });
      
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].downloadUrl);
        if (res.ok) {
          existingData = await res.json();
        }
        await del(blobs[0].url, { token });
      }
      
      // Update data
      const recordIndex = existingData.findIndex((r) => r.id === recordId);
      if (recordIndex !== -1) {
        const record = existingData[recordIndex];
        if (record.imageUrls) {
          record.imageUrls = record.imageUrls.filter((url: string) => url !== imageUrl);
        }
        
        // If it's an image_upload type and no images left, remove the whole record
        if (record.type === 'image_upload' && (!record.imageUrls || record.imageUrls.length === 0)) {
          existingData.splice(recordIndex, 1);
        }
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
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
