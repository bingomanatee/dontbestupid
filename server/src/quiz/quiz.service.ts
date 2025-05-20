import { Injectable } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Model } from 'mongoose';
import { Question } from '../schema/Question';
import { Cat } from '../schema/Cat';
import { InjectModel } from '@nestjs/mongoose';
import { AnswerDto } from './dto/answer.dto';

function asQuestion(q) {
  console.log('question result: ', q);
  return {
    _id: q._id,
    question: q.question,
    cat: q.cat,
    difficulty: q.difficulty,
    answers: q.answers,
  };
}

type Result = {
  id: string;
  index: number;
  answer: string;
  question?: string;
  correctAnswer?: number;
  correctResponse?: string;
  points: number;
  result: 'correct' | 'wrong' | 'stupid' | 'not found';
};

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Question') // or Question.name if using class-based Mongoose setup
    private readonly questionModel: Model<Question>,
    @InjectModel('Cat')
    private readonly catModel: Model<Cat>,
  ) {}

  async results(query: [string, AnswerDto][]) {
    const out: Result[] = [];
    let points = 0;
    for (const item of query) {
      const [id, { index, answer }] = item;

      const q = await this.questionModel.findById(id);
      if (!q) {
        out.push({ id, index, answer, result: 'not found', points });
        continue;
      }
      const { correctAnswer, answers, stupidAnswers, question } = q;

      const response: Omit<Result, 'result' | 'points'> = {
        id,
        index,
        answer,
        question,
        correctAnswer,
        correctResponse: answers[correctAnswer],
      };
      if (q.correctAnswer === index) {
        points += 1;
        out.push({ ...response, result: 'correct', points });
      } else if (stupidAnswers.includes(index)) {
        points = 0;
        out.push({ ...response, result: 'stupid', points });
      } else {
        out.push({ ...response, result: 'wrong', points });
      }
    }
    return out;
  }

  async question(difficulty: number, params: string) {
    const categories = params.split(',');
    const questions = await this.questionModel.aggregate([
      {
        $match: {
          difficulty,
          cat: { $in: categories },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    if (questions.length) return asQuestion(questions[0]);

    let questionsLessDiff = await this.questionModel.aggregate([
      {
        $match: {
          difficulty: { $lte: difficulty },
          cat: { $in: categories },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    if (questionsLessDiff.length) {
      return asQuestion(questionsLessDiff[0]);
    }

    let questionsLessDiffAnyCat = await this.questionModel.aggregate([
      {
        $sample: { size: 1 },
      },
    ]);

    if (questionsLessDiffAnyCat.length) {
      return asQuestion(questionsLessDiffAnyCat[0]);
    }
    return null;
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
