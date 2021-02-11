export const formatError = (err: { message: string; code: string }): string => {
  let errMessage: string = err.message;
  if (err.code === 'auth/user-not-found') {
    errMessage = 'This user is not registered. Please sign up first.';
  }
  if (err.code === 'auth/wrong-password') {
    errMessage = 'Your password or email is incorrect.';
  }
  if (err.code === 'auth/too-many-requests') {
    errMessage = 'Too many attempts. Please try to login later.';
  }
  return errMessage;
};
