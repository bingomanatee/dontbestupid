import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SizeKey = 'regular' | 'full' | 'small' | 'thumb';

@Schema({ timestamps: true })
export class Image {
  @Prop({
    required: true,
    type: {
      regular: { type: String, required: true },
      full: { type: String },
      small: { type: String },
      thumb: { type: String },
    },
  })
  urls: {
    regular: string;
    full?: string;
    small?: string;
    thumb?: string;
  };

  @Prop({ required: true })
  photographer: string;

  @Prop({ enum: ['regular', 'full', 'small', 'thumb'], default: 'regular' })
  defaultSize: SizeKey;

  @Prop({ default: () => new Date() })
  last_checked: Date;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);
