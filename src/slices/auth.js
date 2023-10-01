import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

const initialState = [];

export const signUp = createAsyncThunk('auth/signUp', async (data) => {
  const res = await AuthService.signUp(data);
  return res.data;
});

export const login = createAsyncThunk('auth/login', async (data) => {
  const res = await AuthService.login(data);
  return res.data;
});

export const createStore = createAsyncThunk('store/add', async (data) => {
  const res = await AuthService.createStore(data);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(createStore.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

const { reducer } = authSlice;
export default reducer;
