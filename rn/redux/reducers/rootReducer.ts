import { combineReducers } from 'redux';
import { rentalReducer } from './rentalReducer';
import { authReducer } from './authReducer'; 
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
  auth: authReducer, 
  rentals: rentalReducer, 
  messages: messageReducer
});

export type RootState = ReturnType<typeof rootReducer>

