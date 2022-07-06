import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.cartItems[index].quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

const { actions, reducer } = CartSlice;
export const { addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
