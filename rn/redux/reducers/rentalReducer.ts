import { RentalActionTypes, PopulateRentalAction } from '../actions';
import { Rental } from 'common';

type RentalReducerState = {
  fetchedRental: null | Rental;
};

const initialState: RentalReducerState = {
  fetchedRental: null,
};

export const rentalReducer = (
  state = initialState,
  action: PopulateRentalAction
): RentalReducerState => {
  switch (action.type) {
    case RentalActionTypes.POPULATE_RENTAL:
      return {
        ...state,
        fetchedRental: action.payload.rental,
      };
    default:
      return state;
  }
};
