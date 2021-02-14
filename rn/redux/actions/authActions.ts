import { firebase } from 'gateway';
import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import { getEnvVariables } from 'env';
import * as Google from 'expo-google-app-auth';
import { storeUserAuthData, getUserAuthData, removeUserAuth } from '../utils';
import {
  LoginActionSuccess,
  LoginActionFailure,
  GetUserAuthAction,
  ClearUserAuthAction,
  AuthActionTypes,
} from './types';

type NewUser = { email: string; password: string; username: string };

export const registerUser = (user: NewUser) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const data = await firebase.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    if (data.user) {
      await data.user.updateProfile({ displayName: user.username });
      await firebase.db.doc(`users/${data.user.uid}`).set({
        displayName: user.username,
        createdAt: firebase.getServerTimestamp(),
      });
      await firebase.db
        .doc(`users/${data.user.uid}/_private/${data.user.uid}`)
        .set({ email: user.email });
      await storeUserAuthData(data.user);
      dispatch<LoginActionSuccess>({
        type: AuthActionTypes.SIGN_IN_SUCCESS,
        payload: { user: data.user },
      });
    }
  } catch (err) {
    dispatch<LoginActionFailure>({
      type: AuthActionTypes.SIGN_IN_FAILURE,
      payload: err.message,
    });
    throw err;
  }
};

export type User = Pick<NewUser, 'email' | 'password'>;

export const loginUser = (user: User) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const data = await firebase.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    if (data.user) {
      await storeUserAuthData(data.user);
      dispatch<LoginActionSuccess>({
        type: AuthActionTypes.SIGN_IN_SUCCESS,
        payload: { user: data.user },
      });
    }
  } catch (err) {
    dispatch<LoginActionFailure>({
      type: AuthActionTypes.SIGN_IN_FAILURE,
      payload: { error: err.message },
    });
    throw err;
  }
};

export const getStoredUserAuth = () => async (
  dispatch: Dispatch
): Promise<void> => {
  const authedUser: firebase.User = await getUserAuthData();
  if (authedUser) {
    dispatch<GetUserAuthAction>({
      type: AuthActionTypes.GET_USER_AUTH,
      payload: { user: authedUser },
    });
  }
};

export const loginWithGoogle = () => async (
  dispatch: Dispatch
): Promise<void> => {
  const {
    androidGoogleAuthClientId,
    iosGoogleAuthClientId,
  } = getEnvVariables();
  try {
    const result: Google.LogInResult = await Google.logInAsync({
      androidClientId: androidGoogleAuthClientId,
      iosClientId: iosGoogleAuthClientId,
      scopes: ['profile', 'email'],
    });
    const credential: firebase.auth.OAuthCredential = firebase.getGoogleAuthCred(
      result
    );
    const userCredential: firebase.auth.UserCredential = await firebase.auth.signInWithCredential(
      credential
    );
    const { user, additionalUserInfo } = userCredential;
    if (user && additionalUserInfo) {
      const privDocRef: firebase.firestore.DocumentReference = firebase.db.doc(
        `users/${user.uid}/_private/${user.uid}`
      );
      const userDocRef: firebase.firestore.DocumentReference = firebase.db.doc(
        `users/${user.uid}`
      );
      await firebase.db.runTransaction(
        async (transaction: firebase.firestore.Transaction) => {
          if (additionalUserInfo.isNewUser) {
            const snap: firebase.firestore.DocumentSnapshot = await transaction.get(
              privDocRef
            );
            transaction.set(userDocRef, {
              displayName: user.displayName,
              authType: 'google',
              createdAt: firebase.getServerTimestamp(),
            });
            if (snap.exists)
              transaction.update(privDocRef, { email: user.email });
            else transaction.set(privDocRef, { email: user.email });
          }
        }
      );
      await storeUserAuthData(user);
      dispatch<LoginActionSuccess>({
        type: AuthActionTypes.SIGN_IN_SUCCESS,
        payload: { user: user },
      });
    }
  } catch (err) {
    dispatch<LoginActionFailure>({
      type: AuthActionTypes.SIGN_IN_FAILURE,
      payload: { error: err.message },
    });
    throw err;
  }
};

export const sendPasswordReset = (email: string) => async () => {
  try {
    await firebase.auth.sendPasswordResetEmail(email);
  } catch (err) {
    throw err;
  }
};

export const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  await firebase.auth.signOut();
  removeUserAuth();
  dispatch<ClearUserAuthAction>({ type: AuthActionTypes.CLEAR_USER_AUTH });
  Alert.alert('Logged out', 'Thank you for using SubRent');
};
