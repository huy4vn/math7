import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured on the server.' },
        { status: 500 }
      );
    }

    const folderParam = formData.get('folder') as string;
    const targetFolder = folderParam || 'math-revision';

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload an image via a Promise
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: targetFolder,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      fileId: (uploadResult as any).public_id,
      url: (uploadResult as any).secure_url,
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
