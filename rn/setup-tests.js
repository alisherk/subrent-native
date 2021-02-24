import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
global.fetch = require('jest-fetch-mock');
global.AbortController = jest.fn();

jest.mock('./gateway', () => ({
  firebase: {
    db: {
      collection: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({ orderBy: jest.fn() }),
      }),
      doc: jest.fn().mockReturnValue({ get: jest.fn(), set: jest.fn() }),
    },
    auth: {
      createUserWithEmailAndPassword: jest.fn(),
    },
    functions: {
       httpsCallable: jest.fn()
    },
    geofirestore: {
      doc: jest.fn(),
    },
    addServerTimestamp: jest.fn(),
  },
}));
