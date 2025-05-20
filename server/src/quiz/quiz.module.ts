import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuestionSchema } from '../schema/Question';
import { CatSchema } from '../schema/Cat';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule, // ✅ Needed for OpenAiService
    MongooseModule.forFeature([
      { name: 'Question', schema: QuestionSchema },
      { name: 'Cat', schema: CatSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
