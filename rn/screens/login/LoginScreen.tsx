import React, { useState, useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Form } from 'components/form';
import { LoginFields } from './LoginFields';
import { SignUpFields } from './SignUpFields';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { LoginScreenProps } from 'navigation';
import { Row, Toast } from 'native-base';
import { formatError } from '../utils';
import { HeaderBackButton } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/actions';

enum Screens {
  SIGNUP = 'Sign up',
  RESET_PASSWORD = 'Reset password',
  LOGIN = 'Login',
}

interface FormValues {
  email: string;
  password: string;
  username: string;
}

const RenderInputByScreen = ({
  screen,
  onPress,
}: {
  screen: Screens;
  onPress?: () => void;
}): JSX.Element => {
  if (screen === Screens.SIGNUP) {
    return <SignUpFields />;
  }
  if (screen === Screens.RESET_PASSWORD) {
    return <ResetPasswordScreen />;
  }
  return <LoginFields onPress={onPress} />;
};

export const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState(Screens.LOGIN);

  const originRoute = route.params?.origin || 'Shop';

  const handleSwitchScreen = (passedScreen?: Screens): void => {
    //navigate to desired screen passed as an argument
    let starterScreen = Screens.LOGIN;
    if (passedScreen) {
      starterScreen = passedScreen;
      setScreen(starterScreen);
      navigation.setOptions({ title: starterScreen });
      return;
    }
    //when no argument exists, switch the screen based on current screen state
    if (screen === Screens.LOGIN) {
      starterScreen = Screens.SIGNUP;
      setScreen(starterScreen);
      navigation.setOptions({ title: starterScreen });
      return;
    }
    setScreen(starterScreen);
    navigation.setOptions({ title: starterScreen });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor='white'
          onPress={() => {
            navigation.navigate(originRoute);
            handleSwitchScreen(Screens.LOGIN);
          }}
        />
      ),
    });
  }, [navigation]);

  const handleSubmit = async (formValues: FormValues): Promise<void> => {
    try {
      if (screen === Screens.RESET_PASSWORD) {
        await dispatch(actions.sendPasswordReset(formValues.email));
        Toast.show({
            text: 'Success. Check your inbox for further instruction',
            buttonText: 'OK',
            duration: 4000,
          });
        return;
      }
      if (screen === Screens.SIGNUP) {
        await dispatch(actions.registerUser(formValues));
      } else await dispatch(actions.loginUser(formValues));
      Toast.show({
        text: 'Success. You are logged in!',
        buttonText: 'OK',
        duration: 4000,
      });
    } catch (err) {
      Toast.show({
        text: formatError(err),
        buttonText: 'OK',
        duration: 4000,
      });
    }
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    try {
      await dispatch(actions.loginWithGoogle());
      Toast.show({
        text: 'Success. You are logged in!',
        buttonText: 'OK',
        duration: 4000,
      });
    } catch (err) {
      Toast.show({
        text: 'Oops. Could not sign you in with Google',
        buttonText: 'OK',
        duration: 4000,
      });
    }
  };

  return (
    <Form>
      {(formState) => (
        <>
          <RenderInputByScreen
            screen={screen}
            onPress={() => handleSwitchScreen(Screens.RESET_PASSWORD)}
          />
          <Row style={styles.btnContainer}>
            <Form.Button
              buttonName='Submit'
              disabled={!formState?.isValid || formState?.isSubmitting}
              onSubmit={handleSubmit}
            />
            <Form.Button
              buttonName={screen === Screens.LOGIN ? 'Sign up' : 'Go back'}
              onPress={() => handleSwitchScreen()}
            />
          </Row>
          <Row style={styles.googleBtnContainer}>
            <Form.Button
              danger
              icon
              iconName='logo-google'
              buttonName='Login with Google'
              onPress={handleLoginWithGoogle}
            />
          </Row>
        </>
      )}
    </Form>
  );
};

interface Styles {
  googleBtnContainer: ViewStyle;
  btnContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  btnContainer: {
    justifyContent: 'space-evenly',
  },
  googleBtnContainer: {
    justifyContent: 'center',
    marginTop: 10,
  },
});
