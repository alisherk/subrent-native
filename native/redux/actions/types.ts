import { RentalModel } from 'models';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers';

export enum RentalActions {
  POPULATE_RENTAL = 'POPULATE_RENTAL',
}

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
  GET_USER_AUTH = 'GET_USER_AUTH',
  CLEAR_USER_AUTH = 'CLEAR_USER_AUTH',
}

export interface PopulateRentalAction {
  type: RentalActions.POPULATE_RENTAL;
  payload: { rental: Rental };
}

export interface LoginActionFailure {
  type: AuthActionTypes.SIGN_IN_FAILURE;
  payload: { error: Error | string | null };
}

export interface LoginActionSuccess {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: { user: firebase.User };
}

export interface GetUserAuthAction {
  type: AuthActionTypes.GET_USER_AUTH;
  payload: { user: firebase.User };
}

export interface ClearUserAuthAction {
  type: AuthActionTypes.CLEAR_USER_AUTH;
}

export type AuthAction =
  | LoginActionSuccess
  | LoginActionFailure
  | GetUserAuthAction
  | ClearUserAuthAction;

export interface Rental extends RentalModel {}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;

/* type MyRootState = {};
type MyExtraArg = undefined;
type MyThunkResult<R> = ThunkAction<R, MyRootState, MyExtraArg, Action>;
// It is important to use Action as last type argument, does not work with any.
type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;
const anotherThunkAction = (): MyThunkResult<Promise<boolean>> => (dispatch, getState) => {
  return Promise.resolve(true);
}; */
