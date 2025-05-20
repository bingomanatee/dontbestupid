import { ImageDocument } from '../schema/Image';

type Trivia = {
  id: number;
  name: string;
};
type TriviaCategories = {
  trivia_categories: Trivia[];
};

function isTrivia(a: unknown): a is Trivia {
  return !!(
    a &&
    typeof a === 'object' &&
    'id' in a &&
    'name' in a &&
    typeof (a as any).name === 'string'
  );
}

export function isTriviaCategories(a: unknown): a is TriviaCategories {
  return !!(
    a &&
    typeof a === 'object' &&
    'trivia_categories' in a &&
    Array.isArray((a as any).trivia_categories) &&
    (a as any).trivia_categories.every(isTrivia)
  );
}

// types.cats.ts or types/trivia.ts

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}

export function isTriviaCategory(obj: unknown): obj is TriviaCategory {
  return !!(
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as any).id === 'number' &&
    typeof (obj as any).name === 'string'
  );
}

export function isTriviaCategoryResponse(obj: unknown): obj is TriviaCategoryResponse {
  return !!(
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray((obj as any).trivia_categories) &&
    (obj as any).trivia_categories.every(isTriviaCategory)
  );
}

export function isSizeKey(value: unknown): value is SizeKey {
  return (
    typeof value === 'string' &&
    ['regular', 'full', 'small', 'thumb'].includes(value)
  );
}

type SizeKey = 'regular' | 'full' | 'small' | 'thumb';

export function isImageDocument(obj: unknown): obj is ImageDocument {
  return !!(
    obj &&
    typeof obj === 'object' &&
    'urls' in obj &&
    typeof (obj as any).urls === 'object'
  );
}