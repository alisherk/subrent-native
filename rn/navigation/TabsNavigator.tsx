import React from 'react';
import { RootStackParamList } from './types';
import { CustomerNavigator } from './CustomerNavigator';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

type Icons = {
  [key: string]: string;
};

const icons: Icons = {
  Shop: 'home',
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabsNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: (props) => {
          return <Icon name={icons[route.name]} {...props} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007aff',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Shop'
        component={CustomerNavigator}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
