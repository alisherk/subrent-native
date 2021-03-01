import { Rental, Message } from 'common';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers';
import { FirebaseUser } from 'gateway/types';
import { populateRental } from './rentalActions';

export type ActionError = Error | null | string;

export enum MessageActionTypes {
  DISPATCH_RENTAL_MESSAGES = 'DISPATCH_RENTAL_MESSAGES',
  DISPATCH_MESSAGES = 'DISPATCH_MESSAGES',
  DISPATCH_MESSAGE_SUCCESS = 'DISPATCH_MESSAGE_SUCCESS',
  FLUSH_MESSAGES = 'FLUSH_MESSAGES',
  MESSAGE_ERROR = 'MESSAGE_ERROR',
}

export enum MessageTypes {
    RENTAL_MESSAGES = 'RENTAL_MESSAGES',
    MESSAGES = 'MESSAGES',
  }

export interface DispatchMessageSuccess {
    type: MessageActionTypes.DISPATCH_MESSAGE_SUCCESS, 
    payload: { message: Message, messageType: MessageTypes  }
}

export interface GetRentalMessagesSuccess {
  type: MessageActionTypes.DISPATCH_RENTAL_MESSAGES;
  payload: { messages: Message[] };
}
export interface GetMessagesSuccess {
  type: MessageActionTypes.DISPATCH_MESSAGES;
  payload: { messages: Message[] };
}

export interface FlushMessageAction {
  type: MessageActionTypes.FLUSH_MESSAGES
}

export interface MessageError {
  type: MessageActionTypes.MESSAGE_ERROR;
  payload: { error: ActionError };
}

export type MessageAction = GetRentalMessagesSuccess | GetMessagesSuccess | DispatchMessageSuccess | FlushMessageAction | MessageError;

export enum RentalActionTypes {
  POPULATE_RENTAL = 'POPULATE_RENTAL',
  FLUSH_RENTAL = 'FLUSH_RENTAL',
}

export interface PopulateRentalAction {
  type: RentalActionTypes.POPULATE_RENTAL;
  payload: { rental: Rental };
}
export interface FlushRentalAction {
  type: RentalActionTypes.FLUSH_RENTAL;
}

export type PopulateActions = PopulateRentalAction | FlushRentalAction;

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
  GET_USER_AUTH = 'GET_USER_AUTH',
  CLEAR_USER_AUTH = 'CLEAR_USER_AUTH',
}

export interface LoginActionFailure {
  type: AuthActionTypes.SIGN_IN_FAILURE;
  payload: { error: ActionError };
}

export interface LoginActionSuccess {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: { user: FirebaseUser };
}

export interface GetUserAuthAction {
  type: AuthActionTypes.GET_USER_AUTH;
  payload: { user: FirebaseUser };
}

export interface ClearUserAuthAction {
  type: AuthActionTypes.CLEAR_USER_AUTH;
}

export type AuthAction =
  | LoginActionSuccess
  | LoginActionFailure
  | GetUserAuthAction
  | ClearUserAuthAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;


