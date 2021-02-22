import React from 'react';
import { MainHeader, SimpleHeader } from 'components/header';
import * as CustomerScreens from 'screens/customer-screens';
import { RootStackParamList } from './types';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export const CustomerNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator mode='card'>
      <Stack.Screen
        name='Home'
        component={CustomerScreens.HomeScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Category'
        component={CustomerScreens.CategoryScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Notifications'
        component={CustomerScreens.NotificationScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Rental'
        component={CustomerScreens.RentalScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Contact Owner'
        component={CustomerScreens.ContactOwnerScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CustomerScreens.CheckoutScreen}
        options={{
          header: (props: StackHeaderProps) => <MainHeader {...props} />,
        }}
      />
      <Stack.Screen
        name='Stripe'
        component={CustomerScreens.StripeScreen}
        options={{
          header: (props: StackHeaderProps) => <SimpleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
