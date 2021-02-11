import { combineReducers } from 'redux';
import { rentalReducer } from './rentalReducer';
import { authReducer } from './authReducer'; 

export const rootReducer = combineReducers({
  auth: authReducer, 
  rentals: rentalReducer
});

export type RootState = ReturnType<typeof rootReducer>

