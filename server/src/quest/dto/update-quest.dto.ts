import { PartialType } from '@nestjs/mapped-types';
import { GenerateQuest } from './generate-quest';

export class UpdateQuestDto extends PartialType(GenerateQuest) {}
