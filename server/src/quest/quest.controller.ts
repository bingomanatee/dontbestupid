import { Body, Controller, Post } from '@nestjs/common';
import { QuestService } from './quest.service';
import { GenerateQuest } from './dto/generate-quest';
import { CreateQuestDto } from './dto/create-quest.dto';
import QuestQueryDto from './dto/quest-query.dto';

@Controller('/api/quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Post()
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questService.create(createQuestDto);
  }

  @Post('query')
  query(@Body() query: QuestQueryDto) {
    return this.questService.query(query);
  }

  @Post('generate')
  generate(@Body() g: GenerateQuest) {
    return this.questService.generate(g);
  }

  /*
    @Get()
    findAll() {
      return this.questService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.questService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateQuestDto: UpdateQuestDto) {
      return this.questService.update(+id, updateQuestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.questService.remove(+id);
    }*/
}
