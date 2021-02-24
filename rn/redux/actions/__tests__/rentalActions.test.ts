import { returnWithStore, mockRental as rental } from 'test-utils';
import * as actions from '..';
import { firebase } from 'gateway'; 
jest.mock('../../utils');
jest.mock('components/places-autocomplete');


describe('rental actions', () => {
  
  const data = {
    name: 'test',
    full_day_price: '5',
    half_day_price: '2',
    description: 'test',
    category: 'test',
    confirmation_required: 'yes',
    instructions: 'test',
    region: 'test',
  };

  const store = returnWithStore({ auth: { authedUser: { uid: 1 } } });

  it('dispatches expected data', async () => {
    const expectedData = [
      { type: actions.RentalActions.POPULATE_RENTAL, payload: { rental } },
    ];
    await store.dispatch(actions.populateRental(rental));
    expect(store.getActions()).toEqual(expectedData);
  });

   it('does not throw with uploadRental', async () => {
    expect(
      store.dispatch<any>(actions.uploadRental({ data, imageUri: 'test' }))
    ).rejects.not.toThrow();
  });

  it('does not throw with updateRental', async () => {
    expect(
      store.dispatch<any>(
        actions.updateRental({
          data,
          imageUri: 'test',
          rentalId: '1',
          existingImage: 'test',
        })
      )
    ).rejects.not.toThrow();
  });

  it('does not throw with deleteRental', async () => {
    expect(
      store.dispatch<any>(actions.deleteRental('1'))
    ).rejects.not.toThrow();
  }); 
  
  it('throws with deleteRental', async () => {
    //@ts-ignore
    firebase.geofirestore.doc = jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
            data: jest.fn().mockReturnValue({ status: 'rented'})
        }))
    })); 
    await expect(() =>
      store.dispatch<any>(actions.deleteRental('1'))
    ).rejects.toThrowError('You can not delete rented equipment.')
  });
});



