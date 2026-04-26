import burgerConstructor, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../services/slices/constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
  _id: '3',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

describe('бургер конструктор', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: () => 'test-uuid-123'
      }
    });
  });

  describe('добавление ингредиентов в конструктор', () => {
    it('добавление булки в конструктор', () => {
      const action = addIngredient(mockBun);
      const result = burgerConstructor(undefined, action);

      expect(result.bun).toEqual({
        ...mockBun,
        id: 'test-uuid-123'
      });
      expect(result.ingredients).toHaveLength(0);
    });

    it('добавление основного ингредиента в конструктор', () => {
      const action = addIngredient(mockMain);
      const result = burgerConstructor(undefined, action);

      expect(result.bun).toBeNull();
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toEqual({
        ...mockMain,
        id: 'test-uuid-123'
      });
    });

    it('добавление соуса в конструктор', () => {
      const action = addIngredient(mockSauce);
      const result = burgerConstructor(undefined, action);

      expect(result.bun).toBeNull();
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toEqual({
        ...mockSauce,
        id: 'test-uuid-123'
      });
    });

    it('замена существующей булки при добавлении новой', () => {
      const existingBun: TConstructorIngredient = {
        ...mockBun,
        id: 'old-bun-id'
      };

      const initialState = {
        bun: existingBun,
        ingredients: []
      };

      const action = addIngredient(mockBun);
      const result = burgerConstructor(initialState, action);

      const resultBun = result.bun as TConstructorIngredient;

      expect(resultBun).toEqual({
        ...mockBun,
        id: 'test-uuid-123'
      });
      expect(resultBun.id).not.toBe('old-bun-id');
    });
  });

  describe('удаление ингредиентов из конструктора', () => {
    it('удаление ингредиента по индексу', () => {
      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' },
        { ...mockMain, id: '3' }
      ];

      const initialState = {
        bun: null,
        ingredients
      };

      const action = removeIngredient(1);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients).toHaveLength(2);
      expect(result.ingredients[0].id).toBe('1');
      expect(result.ingredients[1].id).toBe('3');
    });

    it('удаление из пустого списка ингредиентов', () => {
      const initialState = {
        bun: null,
        ingredients: []
      };

      const action = removeIngredient(0);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients).toHaveLength(0);
    });
  });

  describe('изменение порядка ингредиентов в начинке', () => {
    it('перемещение ингредиента вверх', () => {
      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' },
        { ...mockMain, id: '3' }
      ];

      const initialState = {
        bun: null,
        ingredients
      };

      const action = moveIngredientUp(1);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients.map((i) => i.id)).toEqual(['2', '1', '3']);
    });

    it('нельзя переместить первый ингредиент вверх', () => {
      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' }
      ];

      const initialState = {
        bun: null,
        ingredients
      };

      const action = moveIngredientUp(0);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients.map((i) => i.id)).toEqual(['1', '2']);
    });

    it('перемещение ингредиента вниз', () => {
      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' },
        { ...mockMain, id: '3' }
      ];

      const initialState = {
        bun: null,
        ingredients
      };

      const action = moveIngredientDown(0);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients.map((i) => i.id)).toEqual(['2', '1', '3']);
    });

    it('нельзя переместить последний ингредиент вниз', () => {
      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' }
      ];

      const initialState = {
        bun: null,
        ingredients
      };

      const action = moveIngredientDown(1);
      const result = burgerConstructor(initialState, action);

      expect(result.ingredients.map((i) => i.id)).toEqual(['1', '2']);
    });
  });

  describe('очистка конструктора', () => {
    it('очистка всех ингредиентов и булки', () => {
      const bun: TConstructorIngredient = {
        ...mockBun,
        id: 'bun-id'
      };

      const ingredients: TConstructorIngredient[] = [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' }
      ];

      const initialState = {
        bun,
        ingredients
      };

      const action = clearConstructor();
      const result = burgerConstructor(initialState, action);

      expect(result.bun).toBeNull();
      expect(result.ingredients).toHaveLength(0);
    });
  });
});
