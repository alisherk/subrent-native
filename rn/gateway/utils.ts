import { firebase } from './index';

export enum Functions {
  createSession = 'createSession',
}

export const createCallableFunction = <T, R>(
  name: string
): ((data: T) => Promise<R>) => {
  const callable = firebase.functions.httpsCallable(name);
  return async (data: T) => (await callable(data)).data;
};
