import supabase from '../supabaseClient';

/**
 * Generate a public URL for a file stored in Supabase storage.
 * @param bucketName - The name of the storage bucket.
 * @param filePath - The path of the file in the bucket.
 * @returns The public URL or null if an error occurs.
 */
export const generatePublicUrl = (bucketName: string, filePath: string): string | null => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  const { publicUrl } = data;

  if (!publicUrl) {
    console.error(`Error generating public URL for ${filePath}:`);
    return null;
  }

  return publicUrl;
};