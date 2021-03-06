import React from 'react';
import { RootStackParamList } from './types';
import { LoginScreen } from '../screens/login';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { Platform } from 'react-native';
import { Text } from "react-native-elements";
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
          headerTitle: ({ tintColor }) => <Text h4 h4Style={{ color: tintColor, fontWeight: '600' }}> Login </Text>,
          headerStyle: {
            backgroundColor: '#2089dc',
            height: Platform.OS === 'ios' ? 100 : 55, 
          },
          headerTintColor: 'white',
          animationTypeForReplace: !authedUser ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
};
