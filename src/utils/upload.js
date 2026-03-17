import { put, del } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const folder = 'shipfood-uploads';

  try {
    const blob = await put(`${folder}/${fileName}`, file.data, {
      access: 'public',
    });

    return blob.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    await del(imageUrl);
  } catch (error) {
    console.error('Delete error:', error);
  }
};
