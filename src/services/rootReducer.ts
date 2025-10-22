import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingridientSlice';
import burgerConstructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducer from './slices/userOrdersSlice';
import orderInfoReducer from './slices/orderInfoSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredient: burgerConstructorReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer,
  userOrders: userOrdersReducer,
  orderInfo: orderInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;
