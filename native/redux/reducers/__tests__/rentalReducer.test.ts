import { rentalReducer } from '..';
import * as actions from '../../actions';
import { mockRental as rental } from 'test-utils';

describe('rentalReducer', () => {
  it('returns correct state when action is dispatched', () => {
    const action: actions.PopulateRentalAction = {
      type: actions.RentalActions.POPULATE_RENTAL,
      payload: { rental },
    };
    expect(rentalReducer(undefined, action)).toEqual({ fetchedRental: rental });
  });
});
