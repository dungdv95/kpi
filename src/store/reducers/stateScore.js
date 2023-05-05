import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ruleName: '',
  dataRule: [],
  dataUser: [],
};

const slice = createSlice({
  name: 'stateScore',
  initialState,
  reducers: {
    changeRules: (state, {payload: ruleName}) => {
      // console.log('', ruleName);
      state.ruleName = ruleName;
    },
    setDataRule: (state, {payload: dataRule}) => {
      // let tempRule = [];
      // if (dataRule) {
      //   dataRule.map(e => {
      //     tempRule.push({label: e.ruleName, value: e.id, type: e.type});
      //   });
      // }
      // console.log('tempRule', tempRule);
      state.dataRule = dataRule;
    },
    setDataUser: (state, {payload: dataUser}) => {
      state.dataUser = dataUser;
    },
    typeRules: (state, {payload: typeRules}) => {
      console.log('type', typeRules);
      state.typeRules = typeRules;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
