import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { LoginScreen } from 'screens/login';
import { LoginScreenProps } from 'navigation';

export const withAuth = <P extends {}>(
  Component: React.FunctionComponent<P>
): React.FC<P & LoginScreenProps> => (props) => {
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  if (!authedUser) {
    return <LoginScreen {...props} />;
  }
  return <Component {...(props as P)} />;
};
