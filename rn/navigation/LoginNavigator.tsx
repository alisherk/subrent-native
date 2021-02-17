import React from 'react';
import { RootStackParamList } from './types';
import { LoginScreen } from '../screens/login';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export const LoginNavigator = (): JSX.Element => {
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#3F51B5',
            height: Platform.OS === 'ios' ? 65 : 55, 
          },
          headerTintColor: 'white',
          animationTypeForReplace: !authedUser ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
};
