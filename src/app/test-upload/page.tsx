'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Cloudinary Upload</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn ảnh bài tập
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Ảnh đã chọn:</p>
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              {/* Note: Using img tag instead of next/image for local file preview */}
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {uploading ? 'Đang tải lên...' : 'Tải ảnh lên Cloudinary'}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            <h3 className="font-bold mb-2">{result.error ? 'Lỗi tải lên' : 'Thành công!'}</h3>
            <pre className="text-xs overflow-auto bg-white/50 p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>

            {result.url && (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline"
              >
                Mở ảnh đã tải lên ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
