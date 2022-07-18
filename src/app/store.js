import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/CartSlice';
import userReducer from '../features/User/authSlice';
const rootReducer = {
  cart: cartReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
