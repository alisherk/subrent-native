import React from 'react';
import { Platform } from 'react-native';
import { LoginScreen } from '../screens/login';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { Text } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const LoginNavigator = (): JSX.Element => {
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitle: ({ tintColor }) => (
            <Text style={{ fontSize: 21, color: tintColor }}> Login </Text>
          ),
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2089dc',
            height: Platform.OS === 'ios' ? 110 : 85,
          },

          animationTypeForReplace: !authedUser ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
};
