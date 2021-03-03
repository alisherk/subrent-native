import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';

let composedEnhancer;
if (process.env.NODE_ENV !== 'production') {
  composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
} else {
  composedEnhancer = applyMiddleware(thunk);
}

export const store = createStore(rootReducer, composedEnhancer);

export const dispatch = store.dispatch; 