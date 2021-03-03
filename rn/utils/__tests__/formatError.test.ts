import { formatError } from '../formatError';

describe('formatError', () => {

  it('returns correct error - case 1', () => {
    const code = 'auth/user-not-found';
    const message = 'This user is not registered. Please sign up first.';
    const error = { code, message: '' };
    expect(formatError(error)).toEqual(message);
  });

  it('returns correct error - case 2', () => {
    const code = 'auth/wrong-password';
    const message = 'Your password or email is incorrect.';
    const error = { code, message: '' };
    expect(formatError(error)).toEqual(message);
  });

  it('returns correct error - case 3', () => {
    const code = 'auth/too-many-requests';
    const message = 'Too many attempts. Please try to login later.';
    const error = { code, message: '' };
    expect(formatError(error)).toEqual(message);
  });

  it('returns correct error - case 4', () => {
    const error = { code: '', message: 'test' };
    expect(formatError(error)).toEqual(error.message);
  });
});
