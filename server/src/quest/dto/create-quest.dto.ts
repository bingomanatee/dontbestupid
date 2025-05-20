import type { GeneratedQuestion } from '../openai.service';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateQuestDto implements GeneratedQuestion {
  @IsInt()
  difficulty: number;

  @IsString()
  question: string;

  @IsString()
  @IsOptional()
  prompt: string;

  @IsArray()
  @IsString({ each: true })
  answers: string[];

  @IsInt()
  correctAnswer: number;

  @IsArray()
  @IsInt({ each: true })
  stupidAnswers?: number[] | undefined;

  @IsString()
  catName: string;
}
