import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

// export const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
//   formData.append('folder', 'propx_documents');

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
//       {
//         method: 'POST',
//         body: formData
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Upload failed');
//     }

//     const data = await response.json();
//     return {
//       url: data.secure_url,
//       publicId: data.public_id,
//       format: data.format,
//       size: data.bytes
//     };
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'propx_documents');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    console.log(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`)

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      size: data.bytes,
      resourceType: data.resource_type
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};



export const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
          timestamp: Math.floor(Date.now() / 1000),
          signature: await generateSignature(publicId)
        })
      }
    );

    return response.json();
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
};

const generateSignature = async (publicId) => {
  // For production, generate signature on backend
  // For now, we'll use unsigned uploads
  return '';
};

export default cld;