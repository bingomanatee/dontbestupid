import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  questionId: string;
  @IsInt()
  index: number;

  @IsString()
  answer: string;
}
