import {configureStore} from '@reduxjs/toolkit';
import stateGlobal from './reducers/stateGlobal';

import {
  reducer as scoreReducer,
  actions as ScoreActions,
} from './reducers/stateScore';

import {
  reducer as reportReducer,
  actions as ReportActions,
} from './reducers/report';

export const store = configureStore({
  reducer: {
    stateGlobal: stateGlobal,
    score: scoreReducer,
    global: stateGlobal,
    report: reportReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const actions = {
  ...ScoreActions,
  ...ReportActions,
};
