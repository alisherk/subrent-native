import React from 'react';
import { RootStackParamList } from './types';
import { StoreNavigator } from './StoreNavigator';
import { TabsNavigator } from './TabsNavigator';
import { LoginNavigator } from './LoginNavigator';
import { Icon, Button, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { signOut } from '../redux/actions';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator<RootStackParamList>();

export const DrawerNavigator = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleLogout = ({ navigation }: DrawerContentComponentProps): void => {
    dispatch(signOut());
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {authedUser && (
              <Button
                onPress={() => handleLogout(props)}
                danger
                transparent
                style={{ marginLeft: 6 }}
              >
                <Icon name='log-out' />
                <Text>Logout</Text>
              </Button>
            )}
          </DrawerContentScrollView>
        );
      }}
    >
      {authedUser ? (
        <>
          <Drawer.Screen
            name='Home'
            component={TabsNavigator}
            options={{
              drawerIcon: ({ color }) => <Icon name='home' style={{ color }} />,
            }}
          />
          <Drawer.Screen
            name='My Store'
            component={StoreNavigator}
            options={{
              drawerIcon: ({ color }) => <Icon name='cart' style={{ color }} />,
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name='Home'
            component={TabsNavigator}
            options={{
              drawerIcon: ({ color }) => <Icon name='home' style={{ color }} />,
            }}
          />
          <Drawer.Screen
            name='Login'
            component={LoginNavigator}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name='log-in' style={{ color }} />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
