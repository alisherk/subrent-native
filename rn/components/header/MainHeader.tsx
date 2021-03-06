import React, { useRef } from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers/rootReducer';
import { StyleSheet, ViewStyle, Platform, View, Image } from 'react-native';
import { Header, Button, Icon, Badge, Text } from 'react-native-elements';

export const MainHeader = ({
  scene,
  previous,
  navigation,
}: StackHeaderProps) => {
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  const userImageRef = useRef(authedUser?.photoURL);

  const title = //@ts-ignore
  (scene.route.params?.category || scene.route.name).replace(
    /^\w/,
    (fl: string) => fl.toUpperCase()
  );

  const renderThumbnail = () => {
    if (authedUser) {
      return (
        <View style={defaultStyles.thumbContainer}>
          {userImageRef.current ? (
            <Image source={{ uri: userImageRef.current, cache: 'reload' }} />
          ) : (
            <Icon name='person' style={defaultStyles.iconStyle} />
          )}
        </View>
      );
    }
  };

  return (
    <Header>
      {previous ? (
        <Button
        type='clear'
          icon={<Icon name='arrow-back' color='white' />}
          onPress={navigation.goBack}
        />
      ) : (
        <Button
          type='clear'
          icon={<Icon name='menu' size={24} color='white' />}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}
      <Text h4 h4Style={{ color: 'white', fontWeight: '600' }}>
        {title}
      </Text>
    <> 
    <Badge status='error' value='2'  containerStyle={{ position: 'absolute', zIndex: 1, top: 1, right: 3 }}/>
    <Button type='clear' icon={<Icon name='notifications' color='white'/>}/>
    </>
    </Header>
  );
};

interface Styles {
  thumbContainer: ViewStyle;
  badgeStyle: ViewStyle;
  iconStyle: ViewStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  thumbContainer: {
    marginBottom: 8,
    marginHorizontal: 10,
  },
  badgeStyle: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 22,
  },
  iconStyle: {
    color: Platform.OS === 'android' ? 'white' : 'black',
  },
});
