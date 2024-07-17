import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 selectedAddress: {},
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   saveOrderAddress: (state, action) => {
      state.selectedAddress = action.payload
    },
     reset:()=>initialState
  },
});
export const { saveOrderAddress ,logOresetut} = orderSlice.actions;
export default orderSlice.reducer;