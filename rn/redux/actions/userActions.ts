import { firebase } from 'gateway';
import { QuerySnapshot } from 'gateway/types';
import { Message } from 'common';
import cuid from 'cuid';
import {
  AppThunk,
  GetMessagesSuccess,
  DispatchMessageSuccess,
  MessageError,
  MessageActionTypes,
  FlushMessageAction
} from './types';

export const flushMessageReducer = (): FlushMessageAction =>({ 
  type: MessageActionTypes.FLUSH_MESSAGES
})

export const getMessages = (): AppThunk => async (dispatch, getState) => {
  const authedUser = getState().auth.authedUser;
  const rental = getState().rentals.fetchedRental;
  if (!authedUser || !rental) return;
  const messageColRef = firebase.db
    .collection('messages')
    .where('rentalId', '==', rental.id)
    .where('owners', 'array-contains', authedUser.uid)
  try {
    const messageSnapshot = (await messageColRef.get()) as QuerySnapshot<Message>;
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
    dispatch<GetMessagesSuccess>({
      type: MessageActionTypes.GET_MESSAGES_SUCCESS,
      payload: { messages },
    });
  } catch (error) {
    console.log(error);
    dispatch<MessageError>({
      type: MessageActionTypes.MESSAGE_ERROR,
      payload: { error: error.message },
    });
  }
};

export const contactOwner = (text: string): AppThunk => async (
  dispatch,
  getState
) => {
  const authedUser = getState().auth.authedUser;
  const rental = getState().rentals.fetchedRental;
  if (!authedUser || !rental) return;
  const messageColRef = firebase.db.collection('messages');

  try {
    const message: Message = {
      author: authedUser.displayName!,
      authorUid: authedUser.uid,
      authorImage: authedUser.photoURL,
      rentalId: rental.id,
      date: firebase.addServerTimestamp(),
      text: text,
    };
    await messageColRef.add({
      ...message,
      owners: [authedUser.uid, rental.ownerUid],
    });
    const storeMessage = Object.assign({}, message, { id: cuid() });
    dispatch<DispatchMessageSuccess>({
      type: MessageActionTypes.DISPATCH_MESSAGE_SUCCESS,
      payload: { message: storeMessage },
    });
  } catch (error) {
    console.log(error);
    dispatch<MessageError>({
      type: MessageActionTypes.MESSAGE_ERROR,
      payload: { error: error.message },
    });
  }
};
