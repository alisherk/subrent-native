import React from 'react';
import { RootStackParamList } from './types';
import { StoreNavigator } from './StoreNavigator';
import { TabsNavigator } from './TabsNavigator';
import { LoginNavigator } from './LoginNavigator';
import { Icon, Button, Text, Toast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { signOut } from '../redux/actions';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

type Color = {
  color: string;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

export const DrawerNavigator = (): JSX.Element => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  const handleLogout = async ({
    navigation,
  }: DrawerContentComponentProps): Promise<void> => {
    await dispatch(signOut());
    navigation.closeDrawer();
    Toast.show({
      text: 'Success. Check your inbox for further instruction',
      buttonText: 'OK',
      duration: 4000,
    });
  };

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
              drawerIcon: ({ color }: Color) => (
                <Icon name='home' style={{ color }} />
              ),
            }}
          />
          <Drawer.Screen
            name='My Store'
            component={StoreNavigator}
            options={{
              drawerIcon: ({ color }: Color) => (
                <Icon name='cart' style={{ color }} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name='Home'
            component={TabsNavigator}
            options={{
              drawerIcon: ({ color }: Color) => (
                <Icon name='home' style={{ color }} />
              ),
            }}
          />
          <Drawer.Screen
            name='Login'
            component={LoginNavigator}
            options={{
              drawerIcon: ({ color }: Color) => (
                <Icon name='log-in' style={{ color }} />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
