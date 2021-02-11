import { RentalActions, PopulateRentalAction, Rental } from '../actions';

type RentalState = {
  fetchedRental: null | Rental;
};

const initialState: RentalState = {
  fetchedRental: null,
};

export const rentalReducer = (
  state = initialState,
  action: PopulateRentalAction
): RentalState => {
  switch (action.type) {
    case RentalActions.POPULATE_RENTAL:
      return {
        ...state,
        fetchedRental: action.payload.rental,
      };
    default:
      return state;
  }
};
