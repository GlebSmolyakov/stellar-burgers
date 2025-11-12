import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../services/slices/ingridientSlice';
import { TIngredient } from '@utils-types';

jest.mock('../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

describe('ingredients reducer', () => {
  describe('асинхронные экшены fetchIngredients', () => {
    it('должен установить loading=true при начале запроса', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.data).toEqual([]);
    });

    it('должен установить данные и loading=false при успешном запросе', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('должен установить ошибку и loading=false при ошибке запроса', () => {
      const mockError = 'Network error';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: mockError }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.data).toEqual([]);
    });

    it('должен использовать дефолтное сообщение об ошибке если нет message', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ингредиентов');
      expect(state.data).toEqual([]);
    });
  });

  describe('начальное состояние', () => {
    it('должен возвращать initialState при неизвестном экшене', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const state = ingredientsReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
});
