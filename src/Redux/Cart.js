import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const savedData = localStorage.getItem("cart");

const initialState = {
  items: savedData ? JSON.parse(savedData) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newItems = [...state.items, action.payload].sort(
        (a, b) => a.product.id - b.product.id
      );
      state.items = newItems; // am metodit vtovebt rac basketshi da vamatebt kide action.payloadit axal items
      localStorage.setItem("cart", JSON.stringify(newItems));
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload
      ); // amit vpoulob tu item romlis amogebac gvinda basketshia

      let newCart = [...state.items].sort(
        (a, b) => a.product.id - b.product.id
      );

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `ver amoigeb imitoro ar ari shen basketshi es : ${action.payload.id}`
        );
      }

      state.items = newCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsWithId = (state, id) =>
  state.cart.items.filter((item) => {
    return item.id === id;
  });

export const selectGroupedProductsById = createSelector(
  [selectCartItems],
  (items) => {
    const groupedProducts = {};

    items.forEach((item) => {
      const productId = item.product.id;
      if (!groupedProducts[productId]) {
        groupedProducts[productId] = [item];
      } else {
        groupedProducts[productId].push(item);
      }
    });

    return groupedProducts;
  }
);
export const selectCartTotal = (state) => {
  let total = 0;

  for (let i = 0; i < state.cart.items?.length; i++) {
    total += Number(state.cart?.items[i]?.product.price);
  }

  let cartTotal = parseFloat(total.toFixed(2));
  return cartTotal;
};
export default cartSlice.reducer;
