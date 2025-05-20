import { IsOptional, IsString, IsEnum, IsMongoId, IsInt } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['regular', 'full', 'small', 'thumb'])
  imageSizeKey?: 'regular' | 'full' | 'small' | 'thumb';

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsMongoId()
  imageRef?: Types.ObjectId;
}
