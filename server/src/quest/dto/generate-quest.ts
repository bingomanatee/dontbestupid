import { IsInt, IsString } from 'class-validator';

export class GenerateQuest {
  @IsInt()
  count: number = 4;
  @IsString()
  catName: string = '';
  @IsInt()
  difficulty: number = 5;
}
