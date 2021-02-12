import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { rootReducer } from './redux/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootNavigator } from './navigation/RootNavigator';
import { AppLoading } from 'expo';
import { fixFirebaseTimer } from './timerFix';
import * as Font from 'expo-font';
import thunk from 'redux-thunk';


fixFirebaseTimer(); 

let composedEnhancer: any;
if (process.env.NODE_ENV !== 'production') {
  composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
} else {
  composedEnhancer = applyMiddleware(thunk);
}

const store = createStore(rootReducer, composedEnhancer);

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  });
};

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
          <RootNavigator />
        </SafeAreaView>
    </Provider>
  );
}
