import React from 'react';
import { RootStackParamList } from './types';
import { PublicNavigator } from './PublicNavigator';
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

export const TabsNavigator: React.FC = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
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
        component={PublicNavigator}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};
