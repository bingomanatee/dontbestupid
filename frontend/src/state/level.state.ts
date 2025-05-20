import { ObjectCollection } from '@wonderlandlabs/forestry';
import { sortBy } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import getQuizState from './quiz.state';
import type { QuizStateValue } from '../types';

type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, params) => {
      const res = await window.fetch(url, params);
      const json = await res.json();
      return json;
    };
  }

  type LevelStateValue = {
    level: number;
  };
  const state = new ObjectCollection(
    'levelState',
    {
      initial: {
        level: -1,
      },
    },
    {
      saveLevel(e) {
        const level = Number(e.target.value);
        this.set('level', level);
      },
      levelButtonPrompt() {
        if (this.value.level === -1) return this.acts.levelButtonText();

        return `${this.acts.levelButtonText()} (level ${this.value.level})`;
      },
      levelButtonText(): string {
        const { level } = this.value as LevelStateValue;

        switch (level) {
          case -1:
            return 'Choose a difficulty level to continue';
          case 0:
          case 1:
            return 'Continue as a total idiot';
          case 2:
            return 'Continue as a partial idiot';
          case 3:
            return 'Continue as an American';
          case 4:
          case 5:
          case 6:
            return 'Continue as a Normal Person';
          case 7:
            return 'Continue as a Smart Guy';
          case 8:
            return 'Get ready to feel the pain';
          case 9:
            return 'You were warned!';
          case 10:
            return 'You think highly of yourself!';
          default:
            return 'Continue';
        }
      },
      clear() {
        this.set('level', -1);
      },
      loadGlobalState() {
        const { value } = getQuizState() as { value: QuizStateValue };
        if (isLevel(value.level)) {
          this.set('level', value.level);
        }
      },
      persistLevel() {
        const quizState = getQuizState();
        quizState.set('level', this.value.level);
      },
      async load() {
        const cats = await fetch!('/api/cats');
        this.set('cats', sortBy(cats, 'name'));
      },
    },
  );

  state.acts.loadGlobalState();
  return state;
};

export function useLevelState() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    const sub = state.current?.observe((v) => {
      setValue(v);
    });
    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value.level];
}

export type Level = number;

export function isLevel(a: unknown): a is Level {
  return (
    typeof a === 'number' &&
    !isNaN(a) &&
    a >= -1 &&
    a <= 10 &&
    a === Math.floor(a)
  );
}
