// AI-GENERATED SERVICE FOR QUESTION CREATION USING OPENAI

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { Question } from '../schema/Question';
import { OPENAI_API_KEY } from '../const';

type GeneratedResponse = {
  result: GeneratedQuestion[];
  errors?: any[];
  saved?: Question[];
};

export interface GeneratedQuestion {
  prompt: string;
  question: string;
  difficulty: number;
  answers: string[];
  correctAnswer: number;
  stupidAnswers?: number[];
  catName?: string;
}

const SIMPLE_RULES = `- 3 to 4 answers
- 50% chance of zero or one stupid answer
- Common Knowledge, simple high school level 
`;
const BASIC_RULES = `
- 4 answers
- 75% of 1 stupid answer, 25% of no stupid answer
`;
const AVERAGE_RULES = `
- 4 Answers
- 1 stupid answer 
- tiered towards normal adult knowledge
`;
const HARD_RULES = `
-4 to 5 answers
- 25% 2 stupid answers; 75% 1 stupid answer
- can be challenging, college level
`;
const STORNG_RULES = `
- 4 to 6 answers
- equal chance of 1 to 3 stupid answers
- tiered towards well informed adult college graduate
`;
const rules: string[] = [];
rules[0] = SIMPLE_RULES;
rules[1] = BASIC_RULES;
rules[2] = BASIC_RULES;
rules[3] = AVERAGE_RULES;
rules[4] = AVERAGE_RULES;
rules[5] = AVERAGE_RULES;
rules[6] = AVERAGE_RULES;
rules[7] = AVERAGE_RULES;
rules[8] = HARD_RULES;
rules[9] = HARD_RULES;
rules[10] = STORNG_RULES;

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(OpenAiService.name);

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>(OPENAI_API_KEY)!,
    });
  }

  async generateQuestion(
    catName: string,
    difficulty: number,
    count = 10,
  ): Promise<GeneratedResponse> {
    if (!catName) throw new Error('no category provided');
    if (
      !(
        difficulty &&
        typeof difficulty === 'number' &&
        difficulty > 0 &&
        difficulty <= 10
      )
    )
      throw new Error('difficulty is not a valid number');
    const prompt = `
Generate an array of ${count} multiple-choice trivia question in the category "${catName}" 
with difficulty level ${difficulty} (1 = easy ... 10 = hard). 

Return ONLY a raw JSON array of objects (no markdown, no explanation) like:
{
  "question": "What is the capital of France?",
  "answers": ["Banana", "Paris", "London", "Berlin"],
  "correctAnswer": 1,
  "difficulty": ${difficulty},
  "stupidAnswers": [0] 
}

Rules: ${rules[difficulty]}
`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      });

      console.log('completion of request:', completion.choices[0]);
      const content = completion.choices[0].message.content?.trim();
      if (!content) throw new Error('Empty response from OpenAI');

      return this.parsePrompt(content, catName, difficulty);
    } catch (error) {
      console.log('API error:', (error as Error).message);
      this.logger.error('OpenAI generation failed', error);
      throw error;
    }
  }

  parsePrompt(content: string, catName: string, difficulty: number): GeneratedResponse {
    if (!content) throw new Error('no content');
    const parsed: GeneratedQuestion = JSON.parse(content);
    if (!Array.isArray(parsed))
      return {
        result: [],
        errors: [
          {
            message: 'not an array',
          },
        ],
      };

    const errors: any[] = [];
    const result: GeneratedQuestion[] = parsed.reduce<GeneratedQuestion[]>(
      (list: GeneratedQuestion[], item) => {
        try {
          return [...list, this.#parsePromptItem(item, catName, difficulty)];
        } catch (e) {
          errors.push({ message: (e as Error).message, data: item });
        }
        return list;
      },
      [],
    );

    return { result, errors };
  }

  #parsePromptItem(
    content: GeneratedQuestion,
    catName: string,
    difficulty: number,
  ): GeneratedQuestion {
    if (
      !(
        content.answers &&
        Array.isArray(content.answers) &&
        content.answers.every((a: unknown) => {
          return a && typeof a === 'string';
        })
      )
    ) {
      throw new Error('bad questions');
    }

    if (!content.question && typeof content.question === 'string') {
      throw new Error('bad qeustion');
    }

    if (
      !(
        typeof content.correctAnswer === 'number' &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        content.answers[content.correctAnswer]
      )
    ) {
      throw new Error('bad correctAnswer');
    }
    if (!Array.isArray(content.stupidAnswers)) {
      throw new Error('bad stupidAnswers');
    }
    return { ...content, catName, difficulty };
  }
}
