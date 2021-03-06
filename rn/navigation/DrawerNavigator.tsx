import React from 'react';
import { RootStackParamList } from './types';
import { StoreNavigator } from './StoreNavigator';
import { TabsNavigator } from './TabsNavigator';
import { LoginNavigator } from './LoginNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { signOut } from 'redux/actions';
import { Button, Icon, Text } from 'react-native-elements';
import { Colors } from 'theme'
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';


const Drawer = createDrawerNavigator<RootStackParamList>();

export const DrawerNavigator = (): JSX.Element => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  const handleLogout = async ({
    navigation,
  }: DrawerContentComponentProps): Promise<void> => {
    await dispatch(signOut());
    navigation.closeDrawer();
  };

  return (
    <Drawer.Navigator
      drawerType='front'
      drawerContentOptions={{
        activeTintColor: Colors.mainColor,
        inactiveTintColor: 'gray',
      }}
      drawerContent={(props: DrawerContentComponentProps) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {authedUser && (
              <Button
                onPress={() => handleLogout(props)}
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
            name='Shop'
            component={TabsNavigator}
            options={{
              drawerIcon: (props) => {
                return <Icon name='shopping-cart' {...props} />;
              },
            }}
          />
          <Drawer.Screen
            name='My Store'
            component={StoreNavigator}
            options={{
              drawerIcon: (props) => <Icon name='home' {...props} />,
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name='Shop'
            component={TabsNavigator}
            options={{
              drawerIcon: (props) => <Icon name='shopping-cart' {...props} />,
            }}
          />
          <Drawer.Screen
            name='Login'
            component={LoginNavigator}
            options={{
              drawerIcon: (props) => <Icon name='login' {...props} />,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
