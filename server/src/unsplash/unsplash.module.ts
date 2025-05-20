import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnsplashService } from './unsplash.service';
import { UnsplashController } from './unsplash.controller';
import { Image, ImageSchema } from '../schema/Image';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  exports: [UnsplashService, MongooseModule],
  providers: [UnsplashService],
  controllers: [UnsplashController],
})
export class UnsplashModule {}
