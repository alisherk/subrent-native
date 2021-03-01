import { RentalActionTypes, PopulateActions } from '../actions';
import { Rental } from 'common';

type RentalReducerState = {
  fetchedRental: Rental | null;
};

const initialState: RentalReducerState = {
  fetchedRental: null,
};

export const rentalReducer = (
  state = initialState,
  action: PopulateActions
): RentalReducerState => {
  switch (action.type) {
    case RentalActionTypes.POPULATE_RENTAL:
      return {
        ...state,
        fetchedRental: action.payload.rental,
      };
    case RentalActionTypes.FLUSH_RENTAL:
      return {
        ...state,
        fetchedRental: null,
      };
    default:
      return state;
  }
};
