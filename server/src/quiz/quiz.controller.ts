import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('/api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('question/:diff/:cats')
  question(@Param('diff') diff: number, @Param('cats') cats: string) {
    return this.quizService.question(diff, cats);
  }

  @Post('results')
  results(@Body() query: [string, AnswerDto][]) {
    return this.quizService.results(query);
  }
}
