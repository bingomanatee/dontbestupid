import { isObj, ObjectCollection } from '@wonderlandlabs/forestry';
import { useEffect, useRef, useState } from 'react';
import type { QuizStateValue } from '../types';

export const QUIZ_LENGTH = 5;
type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};
export const STATE = {
  START: 'START',
  LOADIND: 'LOADING',
  LOADED: 'LOADED',
  QUIZTITLE: 'QUIZTITLE',
  QUIZ: 'QUIZ',
  QUIZ_COMPLETE: 'QUIZ_COMPLETE',
  EVALUATING: 'EVALUATING',
  ERROR: 'ERROR',
} as const;
export type StateValue = (typeof STATE)[keyof typeof STATE];

type SessionProps = {
  key: string;
  type: string;
  value: unknown;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, ...params: any[]) => {
      const res = await window.fetch(url, ...params);
      const json = await res.json();
      return json;
    };
  }

  const state = new ObjectCollection(
    'catState',
    {
      initial: {
        chosenCats: new Set<string>(),
        level: -1,
        status: STATE.START,
        quests: [],
        answers: new Map(),
        current: '',
        results: [],
      },
      validator(value: QuizStateValue) {
        if (!isObj(value)) throw new Error('value is not an object');
        const { answers, quests, chosenCats, current, level, status } = value;
        try {
          if (!(answers instanceof Map)) {
            throw new Error('invalid answers');
          }

          if (!Array.isArray(quests)) {
            throw new Error('invalid quests');
          }
          if (!(chosenCats instanceof Set)) {
            throw new Error('invalid chosen cats');
          }

          if (current && typeof current !== 'string') {
            throw new Error('invalid current');
          }

          if (typeof level !== 'number') {
            throw new Error('invalid level');
          }

          if (typeof status !== 'string') {
            throw new Error('invalid status');
          }
        } catch (err) {
          console.error('invalid state:', value, err);
          throw err;
        }
      },
    },
    {
      async getQuest() {
        const cats = Array.from(this.value.chosenCats.values());
        const question = await fetch!(
          ['/api/quiz/question', this.value.level, cats.join(',')].join('/'),
        );

        if (!question) {
          throw new Error('cannot get question');
        }

        this.set('quests', [...this.get('quests'), question]);
        this.set('current', question._id);
      },
      async resetQuiz() {
        console.log('-------- quiz reset ----------');
        this.update((v) => ({
          ...v,
          currentQuest: 0,
          status: STATE.QUIZTITLE,
          quests: [],
          answers: new Map(),
        }));
      },

      currentQuestion() {
        const { quests, current } = this.value;
        if (!current) return null;
        return quests.find((q) => q._id === current);
      },
      choose(id: string, response: { index: number; answer: string }) {
        const answers = new Map(this.get('answers'));
        answers.set(id, response);
        this.set('answers', answers);
        if (answers.size >= QUIZ_LENGTH) {
          return this.acts.finish();
        }
        this.acts.getQuest();
      },

      finish() {
        this.set('status', STATE.QUIZ_COMPLETE);
      },

      getQ(id: string) {
        const { quests } = this.value;
        return quests.find((q) => q._id === id);
      },
      startQuiz() {
        this.set('status', STATE.QUIZ);
        this.acts.getQuest();
      },

      getFromSession(key: string, type = 'string') {
        const string = window.sessionStorage.getItem(key);
        if (!string) return;

        switch (type) {
          case 'Set':
            {
              try {
                const value = JSON.parse(string);
                if (Array.isArray(value)) this.set(key, new Set(value));
                else {
                  console.warn('non array set stored', key, value);
                }
              } catch (err) {
                console.log('cannot parse set array:', key, string, err);
              }
            }
            break;

          case 'Map':
            {
              try {
                const value = JSON.parse(string);
                if (Array.isArray(value)) {
                  const map = new Map(Object.entries(value));
                  console.log('::::::::: loaded map', map, 'from ', value);

                  this.set('answers', map);
                } else {
                  console.warn('non array stored', key, value);
                }
              } catch (err) {
                console.error('cannot parse map obj:', key, string, err);
              }
            }
            break;

          case 'number':
            {
              const value = Number.parseInt(string);
              if (!Number.isNaN(value)) {
                this.set(key, value);
              } else {
                console.warn('non number stored:', key, string, value);
              }
            }
            break;

          case 'array':
            try {
              const value = Number.parseInt(string);
              if (Array.isArray(value)) {
                this.set(key, value);
              } else {
                console.warn('non array stored:', key, string, value);
              }
            } catch (err) {
              console.error('cannot parse array ', key, string, err);
            }
            break;

          default:
            this.set(key, string);
        }
      },
      async resolveQuiz() {
        this.set('status', STATE.EVALUATING);
        if (this.value.answers.size < QUIZ_LENGTH) {
          throw new Error('the quiz was not complete');
        }

        const answers = Array.from(this.value.answers.entries());
        const body = JSON.stringify(answers);
        const results = await fetch(
          '/api/quiz/results',
          {
            method: 'POST',
            body,
            headers: {
              'Content-Type': 'application/json',
            },
          },
          body,
        );
        this.set('results', results);
      },
      saveToSession(props: SessionProps) {
        const { key, type, value } = props;

        console.log('saving', key, type, value);
        if (typeof value === 'undefined') {
          console.log('skipping', key);
          return;
        }
        switch (type) {
          case 'number':
          case 'string':
            window.sessionStorage.setItem(key, value);
            break;
          case 'array':
          case 'object':
            try {
              console.log('saving map/obj', key, value);
              window.sessionStorage.setItem(key, JSON.stringify(value));
            } catch (err) {
              console.error('cannot serialize object', key, value, err);
            }
            break;

          case 'Set':
            {
              if (!(value instanceof Set)) {
                return;
              }
              try {
                const list = Array.from(value.values());
                this.acts.saveToSession({
                  key,
                  value: list,
                  type: 'array',
                });
              } catch (err) {
                console.error('cannot serialize set', key, value, err);
              }
            }
            break;

          case 'Map':
            {
              if (!(value instanceof Map)) {
                console.warn('not saving non - map', key, value);
                return;
              }
              const obj = {};
              value.forEach((value, key) => {
                obj[key] = value;
              });
              console.log('saving map ', key, obj);
              this.acts.saveToSession({ key, type: 'object', value: obj });
            }
            break;
          default:
            console.log('saving unknown type', key, type, value);
            window.sessionStorage.setItem(key, value);
        }
      },
      async init() {
        if (!(typeof window === 'object' && window.sessionStorage)) {
          return null;
        }

        this.acts.getFromSession('answers', 'Map');
        this.acts.getFromSession('chosenCats', 'Set');
        this.acts.getFromSession('current', 'string');
        this.acts.getFromSession('level', 'number');
        this.acts.getFromSession('quests', 'array');
        this.acts.getFromSession('status', 'string');

        console.log('-------- quiz loaded from session ----------');
        return this.observe((value: QuizStateValue) => {
          const { chosenCats, level, answers, quests, status, current } = value;
          this.acts.saveToSession({
            key: 'answers',
            type: 'Map',
            value: answers,
          });
          this.acts.saveToSession({
            key: 'chosenCats',
            type: 'Set',
            value: chosenCats,
          });
          this.acts.saveToSession({
            key: 'current',
            type: 'string',
            value: current,
          });
          this.acts.saveToSession({
            key: 'level',
            type: 'number',
            value: level,
          });
          this.acts.saveToSession({
            key: 'quests',
            type: 'array',
            value: quests,
          });
          this.acts.saveToSession({
            key: 'status',
            type: 'string',
            value: status,
          });
          console.log('-------- quiz saved to session ----------');
        });
      },
      saveCategories(ids: string[]) {
        this.set('chosenCats', new Set(ids));
      },
    },
  );

  return state;
};

let quizState;
let sessionSub;

export default function getQuizState() {
  if (!quizState) {
    quizState = stateFactory({});
    sessionSub = quizState.acts.init();
  }
  return quizState;
}

export function closeState() {
  sessionSub?.unsubscribe();
}

export function useQuizState() {
  const state = useRef(null);
  state.current ||= getQuizState();

  const [value, setValue] = useState(state.current?.value ?? {});

  useEffect(() => {
    const sub = state.current?.observe((v) => {
      setValue(v);
    });

    state.current?.acts.init();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value];
}
