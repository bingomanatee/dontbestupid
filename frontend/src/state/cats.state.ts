import { ObjectCollection } from '@wonderlandlabs/forestry';
import { sortBy } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import type { Category, QuizStateValue } from '../types';
import getQuizState from './quiz.state';

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

  type CatStateValue = {
    cats: Category[];
    chosen: Set<string>;
  };
  const state = new ObjectCollection(
    'catState',
    {
      initial: {
        cats: [],
        chosen: new Set(),
      },
    },
    {
      pick(id: string) {
        if (!id) return;
        const chosen = new Set(this.get('chosen').values());
        if (!chosen.has(id)) chosen.add(id);
        else chosen.delete(id);
        this.set('chosen', chosen);
      },
      saveButtonPrompt(): string {
        const { cats, chosen } = this.value as CatStateValue;

        switch (chosen.size) {
          case 0:
            return 'Choose Categories to continue';
          case 1: {
            let id = Array.from(chosen.values())[0];
            return (
              'Continue with ' +
              (cats.find((cat) => cat.id === id)?.name ?? 'Your Category')
            );
          }

          default:
            return 'Continue with ' + chosen.size + ' Categories';
        }
      },
      clearAll() {
        this.set('chosen', new Set());
      },
      pickAll() {
        const cats = this.get('cats');
        const chosen = new Set(cats.map(({ id }) => id));
        this.set('chosen', new Set(chosen));
      },
      columns() {
        if (!Array.isArray(this.value?.cats)) return [];
        const midpoint = Math.ceil(this.value.cats.length / 2);
        return [
          this.value.cats.slice(0, midpoint),
          this.value.cats.slice(midpoint),
        ];
      },
      async init() {
        const cats = await fetch!('/api/cats/init');
        this.set('cats', cats);
      },
      loadGlobalState() {
        const { value } = getQuizState() as { value: QuizStateValue };
        if (value.chosenCats.size) {
          this.set('chosen', new Set(value.chosenCats.values()));
        }
      },
      saveChoices() {
        const quizState = getQuizState();
        const catIds = Array.from(this.get('chosen')?.values());
        quizState.set('chosenCats', new Set(catIds));
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

export function useCatState() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    console.log('loading from ', state.current);
    const sub = state.current?.observe((v) => {
      console.log('updating ', v);
      setValue(v);
    });
    console.log('state.current', state.current);
    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value.cats, value.chosen];
}
