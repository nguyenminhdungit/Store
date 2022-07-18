import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
const StorageKeys = {
  USER: 'user',
  TOKEN: 'access_token',
};

export const logIn = createAsyncThunk('users/login', async (payload) => {
  const data = await userApi.login(payload);
  // console.log(data.user);
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});
export const register = createAsyncThunk('users/register', async (payload) => {
  const data = await userApi.register(payload);
  // console.log(data.user);
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const authSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logOut(state, action) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
  },
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      console.log(action);
      state.current = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      console.log(action);
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { logOut } = actions;
export default reducer;
