import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { StyleSheet, ViewStyle, Platform } from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Badge,
  Text,
  Thumbnail,
  View,
} from 'native-base';

const SCREENS: Record<string, string> = {
  Home: 'Home',
  Checkout: 'Checkout',
  'My Store': 'My Store',
};

export const MainHeader: React.FC<StackHeaderProps> = ({
  scene,
  previous,
  navigation,
}) => {
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  const title = ( //@ts-ignore
    scene.route.params?.category || scene.route.name
  ).replace(/^\w/, (fl: string) => fl.toUpperCase());

  const imageUrl = authedUser?.photoURL && authedUser.photoURL;

  const renderThumbnail = () => {
    if (authedUser && title === SCREENS[title]) {
      return (
        <View style={defaultStyles.thumbContainer}>
          {imageUrl ? (
            <Thumbnail small source={{ uri: imageUrl }} />
          ) : (
            <Icon name='person' style={defaultStyles.iconStyle} />
          )}
        </View>
      );
    }
  };

  return (
    <Header>
      <Left>
        {previous ? (
          <Button transparent onPress={navigation.goBack}>
            <Icon name='arrow-back' />
          </Button>
        ) : (
          <Button
            transparent
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <Icon name='menu' />
          </Button>
        )}
      </Left>
      <Body>
        <Title> {title} </Title>
      </Body>
      <Right>
        {renderThumbnail()}
        <Button
          transparent
          onPress={() => navigation.navigate('Notifications')}
        >
          <Badge style={defaultStyles.badgeStyle}>
            <Text>2</Text>
          </Badge>
          <Icon name='notifications' />
        </Button>
      </Right>
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
