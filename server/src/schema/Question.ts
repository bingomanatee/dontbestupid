import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  correctAnswer: number;

  @Prop()
  answers: string[];

  @Prop()
  difficulty: number;

  @Prop()
  stupidAnswers: number[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cat', required: true })
  cat: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
