import { stateFactory, type StateValue } from './cats.state';
import { CATEGORIES } from './mocks';
import { describe, expect, it } from 'vitest';
import type { ObjectCollection } from '@wonderlandlabs/forestry';

describe('cats', () => {
  let state: ObjectCollection;
  beforeEach(() => {
    state = stateFactory({
      fetch: async (url: string) => {
        switch (url) {
          case '/api/cats':
            return CATEGORIES;
        }
      },
    });
  });
  describe('load', () => {
    it('should load mock data', async () => {
      if (!state) throw new Error('aw.');
      expect(state.value.cats).toEqual([]);
      await state.acts.load();
      expect((state.value as Cat).cats.length).toBe(24);
    });
  });

  describe('pick', () => {
    beforeEach(async () => {
      await state!.acts.load();
    });
    it('should pick a state', () => {
      if (!state) throw new Error('aw.');

      const cat = CATEGORIES[3];

      state.acts.pick(cat.id);

      expect((state.value as StateValue).chosen.has(cat.id)).toBeTruthy();
    });
  });

  describe('pickAll', () => {
    beforeEach(async () => {
      await state!.acts.load();
    });

    it('should pick all the cats', () => {
      state.acts.pickAll();
      const value: StateValue = state.value as StateValue;
      expect(value.chosen.size).toEqual(value.cats.length);
      expect(value.cats.length).toBe(24);
    });
  });
});
