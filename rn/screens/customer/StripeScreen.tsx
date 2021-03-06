import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { getEnvVariables } from 'env';
import { StripeScreenProps } from 'navigation';

export const StripeScreen = ({ route, navigation }: StripeScreenProps) => {
  const handleChange = (e: WebViewNavigation): void => {
    if (!e.loading && e.url === `${getEnvVariables().successPaymentUrl}`) {
      navigation.navigate('Rental');
    
    }

    if (!e.loading && e.url === `${getEnvVariables().cancelPaymentUrl}`) {
      navigation.goBack();
    }
  };

  return (
    <WebView
      source={{
        uri: `${getEnvVariables().generateStripeUrl}?sessionId=${
          route.params.sessionId
        }`,
      }}
      onNavigationStateChange={handleChange}
    />
  );
};
