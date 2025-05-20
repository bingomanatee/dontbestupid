import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Cat, CatDocument } from '../schema/Cat';
import { Image, ImageDocument, SizeKey } from '../schema/Image';
import { request } from 'undici';
import { ConfigService } from '@nestjs/config';
import { MAX_IMAGE_CACHE_HOURS } from '../const';
import {
  isImageDocument,
  isSizeKey,
  isTriviaCategoryResponse,
} from './types.cats';
import { errString } from '../utils';
import { UnsplashService } from '../unsplash/unsplash.service';
import { UnsplashApiResponse } from '../unsplash/unslpash.utils';

@Injectable()
export class CatsService {
  private readonly MAX_CACHE_HOURS: number;

  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
    private readonly configService: ConfigService,
    private readonly unsplashService: UnsplashService, // ✅ here
  ) {
    this.MAX_CACHE_HOURS = parseInt(
      this.configService.get(MAX_IMAGE_CACHE_HOURS, '24'),
      10,
    );
  }

  private isStale(lastChecked?: Date): boolean {
    return (
      !lastChecked ||
      Date.now() - lastChecked.getTime() > this.MAX_CACHE_HOURS * 3600_000
    );
  }

  private async isRemoteImageValid(url: string): Promise<boolean> {
    try {
      const res = await request(url, { method: 'HEAD' });
      return res.statusCode >= 200 && res.statusCode < 400;
    } catch {
      return false;
    }
  }

  async create(createCatDto: CreateCatDto): Promise<void> {
    try {
      await new this.catModel(createCatDto).save();
    } catch (err: unknown) {
      if (/E11000/.test(errString(err))) {
        return;
      }
      throw err;
    }
  }

  async init() {
    const { body } = await request('https://opentdb.com/api_category.php');
    const data = (await body.json()) as UnsplashApiResponse;

    if (!isTriviaCategoryResponse(data)) {
      throw new InternalServerErrorException(
        'Invalid trivia category response',
      );
    }

    for (const t of data.trivia_categories) {
      let imageRef: Types.ObjectId | undefined = undefined;
      let imageSizeKey: SizeKey = 'regular';

      try {
        const { url, size } = await this.unsplashService.fetchImageRecord(
          t.name,
        );
        imageSizeKey = size;

        const imageDoc = await this.imageModel.findOne({
          [`urls.${size}`]: url,
        });

        if (imageDoc?._id) {
          imageRef = imageDoc._id as Types.ObjectId;
        } else {
          console.warn(`[init] Image not found after fetch for "${t.name}"`);
        }
      } catch (err) {
        console.warn(
          `[init] Failed to fetch image for "${t.name}":`,
          errString(err),
        );
      }

      try {
        await this.create({
          name: t.name,
          order: 0,
          imageSizeKey,
          imageRef,
        });
      } catch (err) {
        console.warn(
          `[init] Failed to create cat "${t.name}":`,
          errString(err),
        );
      }
    }

    return this.findAll();
  }

  private async enrichCat(cat: CatDocument): Promise<{
    id: Types.ObjectId;
    name: string;
    description?: string;
    order?: number;
    imageSizeKey?: SizeKey;
    imageUrl?: string;
    photographer?: string;
  }> {
    if (!cat.imageRef) {
      try {
        const { url, size } = await this.unsplashService.fetchImageRecord(
          cat.name,
        );
        const imageDoc = await this.imageModel.findOne({
          [`urls.${size}`]: url,
        });

        if (imageDoc?._id) {
          cat.imageRef = imageDoc._id as Types.ObjectId;
          cat.imageSizeKey = size;
          await cat.save();
          console.log(`[enrichCat] Patched image for "${cat.name}"`);
        } else {
          console.warn(`[enrichCat] Image not found for "${cat.name}"`);
        }
      } catch (err) {
        console.warn(`[enrichCat] Failed for "${cat.name}":`, errString(err));
      }
    }

    const image = this.extractImage(cat.imageRef);
    const sizeKey: SizeKey = isSizeKey(cat.imageSizeKey)
      ? cat.imageSizeKey
      : 'regular';

    const { imageUrl, photographer } = await this.resolveImageInfo(
      image,
      sizeKey,
    );

    return {
      id: cat._id,
      name: cat.name,
      description: cat.description,
      order: cat.order,
      imageSizeKey: cat.imageSizeKey,
      imageUrl,
      photographer,
    };
  }

  async findAll() {
    const cats = await this.catModel
      .find({}, null, {
        populate: { path: 'imageRef' },
      })
      .exec();

    return Promise.all(cats.map((cat) => this.enrichCat(cat as CatDocument)));
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true });
  }

  async remove(id: string) {
    return this.catModel.findByIdAndDelete(id);
  }

  async getCatById(id: string): Promise<{
    id: Types.ObjectId;
    name: string;
    description?: string;
    imageUrl?: string;
    photographer?: string;
  }> {
    const cat = (await this.catModel
      .findById(id, null, {
        populate: { path: 'imageRef' },
      })
      .exec()) as CatDocument | null;

    if (!cat) {
      throw new NotFoundException(`Cat ${id} not found`);
    }

    const image = this.extractImage(cat.imageRef);
    const sizeKey: SizeKey = isSizeKey(cat.imageSizeKey)
      ? cat.imageSizeKey
      : 'regular';

    const { imageUrl, photographer } = await this.resolveImageInfo(
      image,
      sizeKey,
    );

    return {
      id: cat._id,
      name: cat.name,
      description: cat.description,
      imageUrl,
      photographer,
    };
  }

  private extractImage(imageRef: unknown): ImageDocument | undefined {
    return isImageDocument(imageRef) ? imageRef : undefined;
  }

  private async resolveImageInfo(
    image: ImageDocument | undefined,
    sizeKey: SizeKey,
  ): Promise<{ imageUrl?: string; photographer?: string }> {
    if (!image?.urls?.[sizeKey]) return {};

    const url = image.urls[sizeKey];
    const stale = this.isStale(image.last_checked);

    if (stale) {
      const valid = await this.isRemoteImageValid(url);
      image.last_checked = new Date();
      await image.save();
      return valid ? { imageUrl: url, photographer: image.photographer } : {};
    }

    return {
      imageUrl: url,
      photographer: image.photographer,
    };
  }
}
