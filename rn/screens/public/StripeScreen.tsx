import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { getEnvVariables } from 'env';
import { StripeScreenNavigationProp } from 'navigation';
import { Toast } from 'native-base';

interface StripePageProps {
  navigation: StripeScreenNavigationProp;
  route: { params: { sessionId: string } };
}

export const StripeScreen = ({ route, navigation }: StripePageProps) => {
  const handleChange = (e: WebViewNavigation): void => {
    if (!e.loading && e.url === `${getEnvVariables().successPaymentUrl}`) {
      navigation.navigate('Rental');
      Toast.show({
        text: 'This rental is booked',
        buttonText: 'OK',
        duration: 6000,
      });
    }

    if (!e.loading && e.url === `${getEnvVariables().cancelPaymentUrl}`) {
      navigation.goBack();
      Toast.show({
        text: 'Payment cancelled',
        buttonText: 'OK',
        duration: 6000,
      });
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
