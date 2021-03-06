import { AuthAction, AuthActionTypes } from '../actions';
import { FirebaseUser } from 'gateway/types';

type AuthReducerState = {
  authedUser: FirebaseUser | null;
  error: string | null | Error;
};

const initialState: AuthReducerState = {
  authedUser: null,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthReducerState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        authedUser: action.payload.user,
      };
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case AuthActionTypes.GET_USER_AUTH:
      return {
        ...state,
        authedUser: action.payload.user,
      };
    case AuthActionTypes.CLEAR_USER_AUTH:
      return {
        ...state,
        authedUser: null,
      };
    default:
      return state;
  }
};
