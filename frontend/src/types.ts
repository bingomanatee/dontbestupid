import type { Level } from './state/level.state';
import type { StateValue } from './state/quiz.state';

export type Category = {
  name: string;
  id: string;
  imageUrl?: string;
  photographer?: string;
};

export type Question = {
  question: string;
  id: string;
  questions: string[];
  correctAnswer: number;
  cat: string;
  stupidAnswers: number[];
  difficulty: number;
};
export type Answer = {
  index: number;
  answer: string;
};

export type QuizResult = {
  id: string;
  index: number;
  answer: string;
  question?: string;
  correctAnswer?: number;
  correctResponse?: string;
  points: number;
  result: 'correct' | 'wrong' | 'stupid' | 'not found';
};

export type QuizStateValue = {
  chosenCats: Set<string>; // chosen ids
  status: StateValue;
  level: Level;
  current?: string;
  quests: Question[];
  answers: Map<string, Answer>;
  isStupid: boolean;
  results: QuizResult[];
};
