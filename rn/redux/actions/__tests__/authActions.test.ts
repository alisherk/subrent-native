import * as actions from '../authActions';
import { returnWithStore } from 'test-utils';
import { firebase } from 'gateway';
import { AuthActionTypes } from '../types';
import * as utils from '../../utils';
jest.mock('../../utils');

describe('auth actions', () => {
  beforeEach(jest.clearAllMocks);

  const store = returnWithStore();
  const spy = jest.spyOn(utils, 'storeUserAuthData');
  const mockdata = { user: { name: 'test', updateProfile: jest.fn() } };
  const mockuser = { email: 'test', password: 'test', username: 'test' };
  firebase.auth.createUserWithEmailAndPassword = jest
    .fn()
    .mockReturnValue(mockdata);
  it('dispatches expected data with registerUser', async () => {
    await store.dispatch<any>(actions.registerUser(mockuser));
    const expectedData = [
      { payload: mockdata, type: AuthActionTypes.SIGN_IN_SUCCESS },
    ];
    expect(store.getActions()).toEqual(expectedData);
  });
  
  it('calls async storage', async () => {
    await store.dispatch<any>(actions.registerUser(mockuser));
    expect(spy).toBeCalledTimes(1);
  });
});
