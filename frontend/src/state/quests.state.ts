import { ObjectCollection } from '@wonderlandlabs/forestry';
import { useEffect, useRef, useState } from 'react';
import type { Question, QuizStateValue } from '../types';
import getQuizState from './quiz.state';

type StateFactoryProps = {
  fetch?: (url: string, ...options: any[]) => Promise<any>;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, ...params) => {
      const res = await window.fetch(url, ...params);
      const json = await res.json();
      return json;
    };
  }

  type QuestStateValue = {
    quests: Question[];
    pendingGenerations: Record<string, any>[];
    difficulty: number;
    count: number;
    catName: string;
  };

  const state = new ObjectCollection(
    'questState',
    {
      initial: {
        quests: [],
        difficulty: 5,
        pendingGenerations: [],
        count: 4,
        catName: '',
      },
    },
    {
      setDifficulty(e) {
        const input = e?.target?.value;
        if (input) this.set('difficulty', Number(input));
      },
      setCount(e) {
        const input = e?.target?.value;
        if (input) this.set('count', Number(input));
      },
      setCat(e) {
        const input = e?.target?.value;
        console.log('setting catName:', input);
        this.set('catName', input);
      },
      pick(id: string) {
        if (!id) return;
        const chosen = new Set(this.get('chosen').values());
        if (!chosen.has(id)) chosen.add(id);
        else chosen.delete(id);
        this.set('chosen', chosen);
      },
      saveButtonPrompt(): string {},
      clearAll() {
        this.set('quests', []);
      },
      async generate() {
        const { catName, difficulty, count, pendingGenerations } = this.value;
        const body = { catName, difficulty, count };
        if (
          pendingGenerations.find(
            (r) => r.difficulty === difficulty && r.catName === catName,
          )
        )
          return;
        this.set('pendingGenerations', [...pendingGenerations, body]);
        const results = await fetch!(
          '/api/quest/generate',
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          },
          body,
        );
        const withoutBody = this.get('pendingGenerations').filter(
          (f) => !(f.catName === catName && f.difficulty === difficulty),
        );
        this.set('pendingGenerations', withoutBody);
        console.log('re-fetching ', this.value.catName);
        this.acts.loadByName(this.value.catName);
      },

      async load(cat: string) {
        const { difficulty, count } = this.value;
        const body = { cat, difficulty, count, limit: 20 };
        const results = await fetch!(
          '/api/quest/query',
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          },
          body,
        );

        console.log('fetched', results);
        if (results?.items) {
          this.set('quests', results.items);
        }
      },
      async loadByName(catName: string) {
        const { difficulty, count } = this.value;
        const body = { catName, difficulty, count, limit: 20 };
        const results = await fetch!(
          '/api/quest/query',
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          },
          body,
        );

        console.log('loadByName', catName, 'got', results);

        if (results?.items) {
          this.set('quests', results.items);
        }
      },

      loadGlobalState() {
        const { value } = getQuizState() as { value: QuizStateValue };
      },
    },
  );

  state.acts.loadGlobalState();
  return state;
};

export function useQuestState() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    const sub = state.current?.observe((v) => {
      console.log('......state value is ', { ...v });
      setValue({ ...v });
    });
    // state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value.quests, value];
}
