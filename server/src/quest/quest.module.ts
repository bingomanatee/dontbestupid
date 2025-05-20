import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';

import { QuestionSchema } from '../schema/Question';
import { CatSchema } from '../schema/Cat';

import { OpenAiService } from './openai.service';

@Module({
  imports: [
    ConfigModule, // ✅ Needed for OpenAiService
    MongooseModule.forFeature([
      { name: 'Question', schema: QuestionSchema },
      { name: 'Cat', schema: CatSchema },
    ]),
  ],
  providers: [
    QuestService,
    OpenAiService, // ✅ Add OpenAiService to DI
  ],
  controllers: [QuestController],
  exports: [
    QuestService,
    OpenAiService, // ✅ Make available to other modules
  ],
})
export class QuestModule {}
