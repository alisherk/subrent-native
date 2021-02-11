import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';
 
export const RootNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
       <DrawerNavigator />
    </NavigationContainer>
  );
};

