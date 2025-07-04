import axios from 'axios';

export async function subirImagenACloudinary(uri) {
  const data = new FormData();

  // Detectar la extensión del archivo desde la URI
  const extension = uri.split('.').pop().toLowerCase();

  // Determinar el tipo MIME correcto según la extensión
  let mimeType = 'image/jpeg';
  if (extension === 'png') mimeType = 'image/png';
  else if (extension === 'gif') mimeType = 'image/gif';
  // Puedes agregar más tipos si quieres:
  // else if (extension === 'webp') mimeType = 'image/webp';
  // else if (extension === 'heic') mimeType = 'image/heic';

  data.append('file', {
    uri,
    type: mimeType,
    name: `evidencia.${extension}`,
  });

  data.append('upload_preset', 'reto_evidencia');
  data.append('cloud_name', 'dpaerjhgg');

  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dpaerjhgg/image/upload',
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return res.data.secure_url; // URL segura de la imagen
  } catch (error) {
    console.error('❌ Error subiendo imagen a Cloudinary:', error.message);
    throw error;
  }
}
