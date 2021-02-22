import { firebase } from 'gateway';
import { AppThunk } from './types';

export const contactOwner = (message: string): AppThunk => async (
  dispatch,
  getState
) => {
  const authedUser = getState().auth.authedUser;
  const rental = getState().rentals.fetchedRental;
  if (!authedUser || !rental) return;
  const messageColRef = firebase.db.collection('messages');
  try {
    await messageColRef.add({
      author: authedUser.displayName,
      authorUid: authedUser.uid,
      authorImage: authedUser.photoURL,
      date: firebase.getServerTimestamp(),
      owners: [authedUser.uid, rental.ownerUid],
      message,
    });
  } catch (err) {
    throw err; 
  }
};
