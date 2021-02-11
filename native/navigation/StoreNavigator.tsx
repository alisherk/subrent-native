import React from 'react';
import { RootStackParamList } from './types';
import { MainHeader } from '../components/header';
import * as StoreScreens from '../screens/store';
import {
    createStackNavigator,
    StackHeaderProps,
  } from '@react-navigation/stack';  


const Stack = createStackNavigator<RootStackParamList>();

export const StoreNavigator: React.FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='My Store'
        component={StoreScreens.StoreScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='My Rentals'
        component={StoreScreens.ManageRentalScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Post Rental'
        component={StoreScreens.PostRentalScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
