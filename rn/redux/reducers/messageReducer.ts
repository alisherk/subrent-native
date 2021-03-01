import { Message } from 'common';
import {
  MessageAction,
  MessageActionTypes,
  ActionError,
  MessageTypes,
} from '../actions';

type MessageReducerState = {
  messages: Message[];
  rentalMessages: Message[];
  error: ActionError;
};

const initialState: MessageReducerState = {
  messages: [],
  rentalMessages: [],
  error: null,
};

export const messageReducer = (
  state = initialState,
  action: MessageAction
): MessageReducerState => {
  switch (action.type) {
    case MessageActionTypes.DISPATCH_RENTAL_MESSAGES:
      return {
        ...state,
        rentalMessages: action.payload.messages,
        error: null,
      };
    case MessageActionTypes.DISPATCH_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
        error: null,
      };
    case MessageActionTypes.DISPATCH_MESSAGE_SUCCESS:
      if (action.payload.messageType === MessageTypes.RENTAL_MESSAGES) {
        return {
          ...state,
          rentalMessages: [...state.rentalMessages, action.payload.message],
          error: null,
        };
      }
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
