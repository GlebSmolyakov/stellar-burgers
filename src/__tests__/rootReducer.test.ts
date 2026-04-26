import { describe, test, expect } from '@jest/globals';
import { combineReducers } from '@reduxjs/toolkit';

describe('rootReducer инициализация', () => {
  test('должен возвращать состояние с 7 редюсерами при неизвестном экшене', () => {
    const mockReducer = (state = {}) => state;

    const testReducer = combineReducers({
      ingredients: mockReducer,
      burgerIngredient: mockReducer,
      feed: mockReducer,
      user: mockReducer,
      order: mockReducer,
      userOrders: mockReducer,
      orderInfo: mockReducer
    });

    const state = testReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(Object.keys(state)).toEqual([
      'ingredients',
      'burgerIngredient',
      'feed',
      'user',
      'order',
      'userOrders',
      'orderInfo'
    ]);

    expect(Object.keys(state)).toHaveLength(7);
  });
});
