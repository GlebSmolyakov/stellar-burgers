import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const item = { ...action.payload, id: crypto.randomUUID() };
      if (item.type === 'bun') {
        state.bun = item;
      } else {
        state.ingredients.push(item);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i <= 0) return;
      const temp = state.ingredients[i - 1];
      state.ingredients[i - 1] = state.ingredients[i];
      state.ingredients[i] = temp;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i >= state.ingredients.length - 1) return;
      const temp = state.ingredients[i + 1];
      state.ingredients[i + 1] = state.ingredients[i];
      state.ingredients[i] = temp;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructor.actions;

export default burgerConstructor.reducer;
