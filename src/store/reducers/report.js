import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataReport: [],
  groupId: 2,
};

const slice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setDataReport: (state, {payload: dataReport}) => {
      state.dataReport = [];
      let tmpData = [];
      dataReport.map(e => {
        tmpData.push({
          value: e.score,
          label: e.username.substring(0, 3),
          username: e.username,
          email: e.email,
        });
      });
      state.dataReport = tmpData;
    },
    setGroupId: (state, {payload: groupId}) => {
      state.groupId = groupId;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
