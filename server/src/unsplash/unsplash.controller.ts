import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  /**
   * Fetch a random Unsplash image for a topic
   * @param topic the image subject or theme
   * @returns { url, photographer }
   */
  @Get('fetch')
  async fetchImage(
    @Query('topic') topic?: string,
  ): Promise<{ url: string; photographer: string }> {
    if (!topic || topic.trim().length === 0) {
      throw new BadRequestException('Topic query parameter is required');
    }

    return this.unsplashService.fetchImageRecord(topic.trim());
  }
}
