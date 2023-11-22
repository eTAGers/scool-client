import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../services/ProductService';

const initialState = [];

export const fetchProducts = createAsyncThunk('products/fetch', async (data) => {
  const res = await ProductService.fetchProducts(data);
  return res.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

const { reducer } = productsSlice;
export default reducer;
