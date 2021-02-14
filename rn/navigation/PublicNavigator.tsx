import React from 'react';
import { MainHeader, SimpleHeader } from '../components/header';
import * as PublicScreens from '../screens/public';
import { RootStackParamList } from './types';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export const PublicNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator mode='card'>
      <Stack.Screen
        name='Home'
        component={PublicScreens.HomeScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Category'
        component={PublicScreens.CategoryScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Notifications'
        component={PublicScreens.NotificationScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Rental'
        component={PublicScreens.RentalScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={PublicScreens.CheckoutScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Stripe'
        component={PublicScreens.StripeScreen}
        options={{
          header: (props: StackHeaderProps) => <SimpleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};