import React from 'react';
import { LoginScreenProps } from 'navigation';

export const WithAuth = <P extends {}>(
  Component: React.ComponentType<P>
): React.ComponentType<P & LoginScreenProps> => (props) => {

  return <Component {...(props as P)} />;
};
