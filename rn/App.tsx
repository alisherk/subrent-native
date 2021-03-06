import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/setup-store';
import { RootNavigator } from './navigation/RootNavigator';
import AppLoading from 'expo-app-loading';
import { fixFirebaseTimer } from './timerFix';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';

fixFirebaseTimer();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
