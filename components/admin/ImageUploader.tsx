import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';

interface ImageUploaderProps {
  bucket: string;
  folder?: string;
  onUploadComplete: (publicUrl: string) => void;
  currentImage?: string;
  aspectRatio?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  bucket,
  folder = '',
  onUploadComplete,
  currentImage,
  aspectRatio = 'aspect-video',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    setUploading(true);
    setError(null);

    const ext = file.name.split('.').pop();
    const fileName = `${folder ? folder + '/' : ''}${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    setPreview(publicUrl);
    onUploadComplete(publicUrl);
    setUploading(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id={`upload-${bucket}`}
      />

      {preview ? (
        <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden border border-border-dark group`}>
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-sm font-bold border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              Replace
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500/20 backdrop-blur-md rounded-xl text-red-400 text-sm font-bold border border-red-500/20 hover:bg-red-500/30 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspectRatio} rounded-2xl border-2 border-dashed border-border-dark hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-primary cursor-pointer`}
        >
          {uploading ? (
            <span className="material-symbols-outlined text-3xl animate-spin">refresh</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-4xl">cloud_upload</span>
              <span className="text-sm font-bold">Click to upload image</span>
              <span className="text-xs text-slate-600">Max 5MB • JPG, PNG, WebP</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
