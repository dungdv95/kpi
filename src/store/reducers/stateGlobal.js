import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLogin: false,
};

export const stateGlobal = createSlice({
  name: 'stateGlobal',
  initialState,
  reducers: {
    changeBackground: (state, action) => {
      state.background = action.payload;
    },
    changeStatusLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {changeBackground, changeStatusLogin, changeLoading} =
  stateGlobal.actions;
export default stateGlobal.reducer;
