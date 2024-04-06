import { createSlice } from "@reduxjs/toolkit";

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
        (a, b) => a.id - b.id
      );
      state.items = newItems; // am metodit vtovebt rac basketshi da vamatebt kide action.payloadit axal items
      localStorage.setItem("cart", JSON.stringify(newItems));

      console.log(state.items);
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      ); // amit vpoulob tu item romlis amogebac gvinda basketshia
      let newCart = [...state.items].sort((a, b) => a.id - b.id);

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

export const selectCartTotal = (state) => {
  let total = 0;
  for (let i = 0; i < state.cart.items?.length; i++) {
    total += Number(state.cart?.items[i]?.price);
  }

  let cartTotal = parseFloat(total.toFixed(2));
  return cartTotal;
};
export default cartSlice.reducer;
