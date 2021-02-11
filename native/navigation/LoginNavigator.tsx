import React from 'react';
import { AppNavigationProp, RootStackParamList } from './types';
import { LoginScreen } from '../screens/login';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';


const Stack = createStackNavigator<RootStackParamList>();

export const LoginNavigator: React.FC = (): JSX.Element => {
  const navigation = useNavigation<AppNavigationProp>();
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
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.goBack()}
            />
          ),
          animationTypeForReplace: !authedUser ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
};
