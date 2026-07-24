/**
 * Módulo de optimización para imágenes de Cloudinary
 * Añade formatos modernos (f_auto), compresión inteligente (q_auto) y redimensionamiento (w_<width>).
 */

export interface CloudinaryOptions {
  width?: number;
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'scale' | 'fill' | 'limit' | 'fit' | 'thumb';
}

export function getOptimizedImageUrl(
  url: string | undefined | null,
  options: CloudinaryOptions = {}
): string {
  if (!url || typeof url !== 'string') return '';
  
  // Si no es una URL de Cloudinary, retornar la URL original intacta
  if (!url.includes('res.cloudinary.com') && !url.includes('/upload/')) {
    return url;
  }

  const { width, quality = 'auto', format = 'auto', crop = 'limit' } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width && width > 0) {
    transforms.push(`w_${width}`, `c_${crop}`);
  }
  const transformString = transforms.join(',');

  if (url.includes('/upload/')) {
    const parts = url.split('/upload/');
    const prefix = parts[0] + '/upload/';
    let suffix = parts[1];

    // Limpiar transformaciones duplicadas previas si existían
    suffix = suffix
      .replace(/q_auto\/f_auto\//g, '')
      .replace(/f_auto\/q_auto\//g, '')
      .replace(/q_auto\//g, '')
      .replace(/f_auto\//g, '');

    return `${prefix}${transformString}/${suffix}`;
  }

  return url;
}
