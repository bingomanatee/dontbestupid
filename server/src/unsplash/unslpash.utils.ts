// AI gen with heavy curation

import { request } from 'undici';

export interface UnsplashImage {
  id: string;
  alt_description?: string;
  urls: {
    regular: string;
    full?: string;
    small?: string;
    thumb?: string;
  };
  user: {
    name: string;
  };
}

export interface UnsplashApiResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export function isValidUnsplashResponse(data: unknown): data is UnsplashApiResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'urls' in data &&
    'user' in data &&
    typeof (data as any).urls?.regular === 'string' &&
    typeof (data as any).user?.name === 'string'
  );
}

export async function validateImageURL(url: string): Promise<boolean> {
  try {
    const res = await request(url, { method: 'HEAD' });
    return res.statusCode >= 200 && res.statusCode < 400;
  } catch {
    return false;
  }
}