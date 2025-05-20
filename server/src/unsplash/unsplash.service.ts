// AI generated with heavy curation

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument, SizeKey } from '../schema/Image';
import { ConfigService } from '@nestjs/config';
import { request } from 'undici';
import { PEXELS_API_KEY } from '../const';

/**
 * note we have pivoted to Pexels so this is a misnomer at this point.
 */

@Injectable()
export class UnsplashService {
  private readonly UNSPLASH_URL = 'https://api.unsplash.com/photos/random';

  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<ImageDocument>,
    private readonly config: ConfigService,
  ) {}

  get apiKey(): string {
    return (
      this.config.get<string>(PEXELS_API_KEY) ??
      (() => {
        throw new Error('no access key');
      })()
    );
  }

  async fetchImageRecord(
    topic: string,
    sizeKey: SizeKey = 'regular',
  ): Promise<{
    url: string;
    photographer: string;
    size: SizeKey;
  }> {
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(topic)}&per_page=1`;

      const apiKey = this.apiKey;
      const res = await request(url, {
        method: 'GET',
        headers: {
          Authorization: apiKey,
          Accept: 'application/json',
        },
      });

      const data = await res.body.json() as {
        photos: Array<{
          src: Record<string, string>;
          photographer?: string;
        }>;
      };

      if (!data.photos?.length) {
        throw new Error(`No image found for topic "${topic}"`);
      }

      console.log('photo retrieved:', data);

      const photo = data.photos[0];
      const imageUrl = photo.src?.medium ?? photo.src?.original;
      const photographer = photo.photographer ?? 'unknown';

      if (!imageUrl) {
        throw new Error('No valid image URL found in Pexels response');
      }

      await this.imageModel.findOneAndUpdate(
        { [`urls.${sizeKey}`]: imageUrl },
        {
          $set: {
            [`urls.${sizeKey}`]: imageUrl,
            photographer,
            last_checked: new Date(),
          },
        },
        { upsert: true, new: true },
      );

      return {
        url: imageUrl,
        photographer,
        size: sizeKey,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(
          `Image fetch failed: ${err.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Unexpected error while fetching image',
      );
    }
  }
}
