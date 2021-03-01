import { firebase } from 'gateway';
import { QuerySnapshot, FirestoreQuery } from 'gateway/types';
import { Message } from 'common';
import { store } from '../store';
import cuid from 'cuid';
import {
  AppThunk,
  GetMessagesSuccess,
  GetRentalMessagesSuccess,
  DispatchMessageSuccess,
  MessageError,
  MessageActionTypes,
  FlushMessageAction,
  MessageTypes,
} from './types';

const dispatchMessageByType = (
  type: MessageTypes,
  messages: Message[]
) => {
  if (type === MessageTypes.RENTAL_MESSAGES) {
    store.dispatch<GetRentalMessagesSuccess>({
      type: MessageActionTypes.DISPATCH_RENTAL_MESSAGES,
      payload: { messages },
    });
    return;
  }
  store.dispatch<GetMessagesSuccess>({
    type: MessageActionTypes.DISPATCH_MESSAGES,
    payload: { messages },
  });
};

export const getMessages = (
  query: FirestoreQuery,
  messageType: MessageTypes
): AppThunk => async (dispatch, getState) => {
  try {
    const messageSnapshot = (await query.get()) as QuerySnapshot<Message>;
    if (messageSnapshot.empty) {
      dispatch<MessageError>({
        type: MessageActionTypes.MESSAGE_ERROR,
        payload: { error: "You don't have any messages yet." },
      });
      return;
    }
    const messages: Message[] = [];
    messageSnapshot.forEach((message) => {
      messages.push({ id: message.id, ...message.data() });
    });
    dispatchMessageByType(messageType, messages);
  } catch (error) {
    console.log(error);
    dispatch<MessageError>({
      type: MessageActionTypes.MESSAGE_ERROR,
      payload: { error: 'Oops. We encountered internal server error.' },
    });
  }
};

interface ContactOwnerArgs {
  text: string;
  rentalId: string | undefined;
  secondaryPartId: string | undefined;
  messageType: MessageTypes;
}

export const contactOwner = ({
  text,
  rentalId,
  secondaryPartId,
  messageType,
}: ContactOwnerArgs): AppThunk => async (dispatch, getState) => {
  const authedUser = getState().auth.authedUser;
  if (!authedUser || !rentalId || !secondaryPartId) {
    dispatch<MessageError>({
      type: MessageActionTypes.MESSAGE_ERROR,
      payload: {
        error: 'Oops. You are not authorized to access this resource.',
      },
    });
    return;
  }
  const messageColRef = firebase.db.collection('messages');
  try {
    const message: Message = {
      author: authedUser.displayName!,
      authorUid: authedUser.uid,
      authorImage: authedUser.photoURL,
      rentalId: rentalId,
      date: firebase.addServerTimestamp(),
      text: text,
    };
    await messageColRef.add({
      ...message,
      participants: [authedUser.uid, secondaryPartId],
    });
    const storeMessage = Object.assign({}, message, { id: cuid() });
    dispatch<DispatchMessageSuccess>({
      type: MessageActionTypes.DISPATCH_MESSAGE_SUCCESS,
      payload: { message: storeMessage, messageType },
    });
  } catch (error) {
    console.log(error);
    dispatch<MessageError>({
      type: MessageActionTypes.MESSAGE_ERROR,
      payload: { error: 'Oops. We encountered internal server error.' },
    });
  }
};

export const flushMessageReducer = (): FlushMessageAction => ({
  type: MessageActionTypes.FLUSH_MESSAGES,
});
