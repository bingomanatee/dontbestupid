import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Image } from './Image'; // Make sure this path is correct

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  order?: number;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Question' }],
    default: [],
  })
  questions: Types.ObjectId[];

  @Prop({ enum: ['regular', 'full', 'small', 'thumb'], default: 'regular' })
  imageSizeKey?: 'regular' | 'full' | 'small' | 'thumb';

  @Prop({ type: Types.ObjectId, ref: Image.name })
  imageRef?: Types.ObjectId;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
