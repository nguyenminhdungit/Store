import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItems;

export const cartItemCountSelector = createSelector(cartItemSelector, (cartItems) => {
  return cartItems.reduce((count, item) => (count += item.quantity), 0);
});
export const cartItemTotalSelector = createSelector(cartItemSelector, (cartItems) => {
  // console.log(cartItems.reduce((total, item) => total + item.quantity * item.product.salePrice, 0));
  return cartItems.reduce((total, item) => total + item.quantity * item.product.salePrice, 0);
});
