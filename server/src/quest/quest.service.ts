import { Injectable } from '@nestjs/common';
import { GenerateQuest } from './dto/generate-quest';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../schema/Question';
import { Cat } from '../schema/Cat';
import { OpenAiService } from './openai.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import QuestQueryDto from './dto/quest-query.dto';

@Injectable()
export class QuestService {
  constructor(
    @InjectModel('Question') // or Question.name if using class-based Mongoose setup
    private readonly questionModel: Model<Question>,
    @InjectModel('Cat')
    private readonly catModel: Model<Cat>,
    private readonly openAiService: OpenAiService,
  ) {}

  async generate(createQuestDto: GenerateQuest) {
    const questList = await this.openAiService.generateQuestion(
      createQuestDto.catName,
      createQuestDto.difficulty,
      createQuestDto.count,
    );
    questList.saved = [];
    for (const result of questList.result) {
      const i = questList.result.indexOf(result);
      try {
        questList.saved[i] = await this.create({
          ...result,
          difficulty: createQuestDto.difficulty,
        } as CreateQuestDto);
      } catch (err) {
        console.log('cannot make ', result, err);
        if (err instanceof Error)
          questList.errors?.push({ message: err.message, input: result });
      }
    }
    return questList;
  }

  async query(params: QuestQueryDto) {
    const filter: Record<string, any> = {};

    if (params.cat) {
      filter.cat = params.cat;
    }
    if (params.catName) {
      const category = await this.catModel
        .findOne({ name: params.catName })
        .exec();
      if (category) {
        filter.cat = category._id;
      }
    }

    if (typeof params.difficulty === 'number') {
      filter.difficulty = params.difficulty;
    }

    if (params.prompt) {
      filter.prompt = { $regex: params.prompt, $options: 'i' };
    }

    // Count total matching documents (ignores pagination)
    const total = await this.questionModel.countDocuments(filter);

    // Build paginated query
    const query = this.questionModel.find(filter).populate('cat');

    if (typeof params.offset === 'number') {
      query.skip(params.offset);
    }

    if (typeof params.limit === 'number') {
      query.limit(params.limit);
    }

    const items = await query.exec();

    return {
      total,
      items,
    };
  }

  async create(createDto: CreateQuestDto): Promise<Question> {
    const {
      answers,
      correctAnswer,
      difficulty,
      question,
      catName,
      stupidAnswers,
    } = createDto;
    const category = await this.catModel.findOne({ name: catName }).exec();
    if (!category) {
      throw new Error(`Category with name "${catName}" not found.`);
    }

    return new this.questionModel({
      answers,
      correctAnswer,
      difficulty,
      question,
      stupidAnswers,
      cat: category._id,
    }).save();
  }

  findAll() {
    return `This action returns all quest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quest`;
  }

  update(id: number, updateQuestDto: UpdateQuestDto) {
    return `This action updates a #${id} quest`;
  }

  remove(id: number) {
    return `This action removes a #${id} quest`;
  }
}
