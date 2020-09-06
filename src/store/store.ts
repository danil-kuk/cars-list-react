import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as History from 'history';

import rootReducer from './root-reducer';

export const history = History.createBrowserHistory();

const initialState = {};
const middleware = [thunk];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
);


export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export type RootState = ReturnType<typeof rootReducer>
