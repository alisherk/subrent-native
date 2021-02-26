import { Message } from 'common';
import { MessageAction, MessageActionTypes, ActionError } from '../actions';

type MessageReducerState = {
  messages: Message[];
  error: ActionError;
};

const initialState: MessageReducerState = {
  messages: [],
  error: null,
};

export const messageReducer = (
  state = initialState,
  action: MessageAction
): MessageReducerState => {
  switch (action.type) {
    case MessageActionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case MessageActionTypes.DISPATCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        error: null,
      };
    case MessageActionTypes.FLUSH_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    case MessageActionTypes.MESSAGE_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
