import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartProducts: [],
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let temp = [...state.cartProducts];
      let index = temp.findIndex((item: any) => item._id == action.payload._id);
      if (index === -1) {
        let obj: any = { ...action.payload, qty: 1 };
        temp.push(obj);

        state.cartProducts = temp;
        state.total += parseInt(action.payload.price);
        state.cartCount += 1;
        console.log("temp", temp);
      } else {
        temp[index].qty += 1;
        state.total += parseInt(action.payload.price);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeToCart: (state, action) => {
      let temp = [...state.cartProducts];
      let index = temp.findIndex((item) => item._id == action.payload._id);

      if (temp[index].qty == 1) {
        temp.splice(index, 1);
        state.cartCount -= 1;
        state.cartProducts = temp;
        state.total -= parseInt(action.payload.price);
      } else {
        temp[index].qty -= 1;
        state.cartProducts = temp;
        state.total -= parseInt(action.payload.price);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setCookiesState: (state, action) => {
      console.log("setCookiesState", state, action?.payload);
      state.cartProducts = action.payload?.cartProducts;
      state.total = action.payload?.total;
      state.cartCount = action.payload?.cartCount;
    },
    resetCart: () => initialState,
  },
});
export const { addToCart, resetCart, removeToCart, setCookiesState } =
  cartSlice.actions;
export default cartSlice.reducer;
