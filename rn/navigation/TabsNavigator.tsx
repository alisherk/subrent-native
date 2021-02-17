import React from 'react';
import { RootStackParamList } from './types';
import { CustomerNavigator } from './CustomerNavigator';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

type Icons = {
  [key: string]: string;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabsNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color }) => {
          const icons: Icons = {
            Home: 'home',
          };
          return <Icon name={icons[route.name]} style={{ color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007aff',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Home'
        component={CustomerNavigator}
        options={{
          tabBarButton: (props: any) => <TouchableOpacity {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
