'use client';

import Image from 'next/image';
import { isCloudinaryUrl, cloudinaryLoader } from '@/lib/cloudinary';

export default function SmartImage({ src, alt = '', ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      {...(isCloudinaryUrl(src) ? { loader: cloudinaryLoader } : {})}
      {...props}
    />
  );
}
