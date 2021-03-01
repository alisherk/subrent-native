import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RootNavigator } from './navigation/RootNavigator';
import { AppLoading } from 'expo';
import { fixFirebaseTimer } from './timerFix';
import { Root } from 'native-base';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';

fixFirebaseTimer();

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Root>
          <RootNavigator />
        </Root>
      </SafeAreaView>
    </Provider>
  );
}
