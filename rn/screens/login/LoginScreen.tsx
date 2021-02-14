import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'components/form';
import { LoginScreenNavigationProp } from 'navigation';
import { Row } from 'native-base';
import { Alert, StyleSheet, ViewStyle } from 'react-native';
import * as actions from 'redux/actions';
import { formatError } from '../utils';

enum Screens {
  SIGNUP = 'Signup',
  RESET = 'Reset password',
  LOGIN = 'Login',
}

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenNavigationProp;
}

interface Data {
  email: string;
  password: string;
  username: string;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useDispatch();
  const [screen, switchScreen] = useState<string>(Screens.LOGIN);

  const handleSubmit = async (data: Data): Promise<void> => {
    try {
      if (screen === Screens.RESET) {
        await dispatch(actions.sendPasswordReset(data.email));
        Alert.alert(
          'Success',
          'Please check your email to reset your password'
        );
        return;
      }
      if (screen === Screens.SIGNUP) await dispatch(actions.registerUser(data));
      else await dispatch(actions.loginUser(data));
      Alert.alert('Success', 'Your are logged in.');
    } catch (err) {
      Alert.alert('Error', formatError(err));
    }
  };

  const handleSwitchScreen = (screen: string): void => {
    switchScreen(screen);
    navigation.setOptions({ title: screen });
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    try {
      await dispatch(actions.loginWithGoogle());
      Alert.alert('Success!', 'Your are logged in.');
    } catch (err) {
      Alert.alert('Error', 'Could not login with Google.');
    }
  };

  return (
    <Form>
      {(formState) => (
        <>
          {screen === Screens.RESET ? (
            <>
              <Form.TextInput
                name='email'
                errMsg='Valid email is required'
                rules={{
                  required: true,
                  pattern: /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,3}$/,
                }}
                placeholderText='Email'
              />
              <Row style={styles.btnContainer}>
                <Form.Button
                  buttonName='Reset password'
                  disabled={!formState?.isValid || formState?.isSubmitting}
                  onSubmit={handleSubmit}
                />
                <Form.Button
                  buttonName='Go back'
                  onPress={() => handleSwitchScreen(Screens.LOGIN)}
                />
              </Row>
            </>
          ) : screen === Screens.SIGNUP ? (
            <>
              <Form.TextInput
                name='username'
                errMsg='Username is required'
                rules={{ required: true }}
                placeholderText='Username'
              />
              <Form.TextInput
                name='email'
                errMsg='Valid email is required'
                rules={{
                  required: true,
                  pattern: /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,3}$/,
                }}
                placeholderText='Email'
              />
              <Form.TextInput
                name='password'
                errMsg='Valid password is required'
                rules={{ required: true }}
                placeholderText='Password'
                secureTextEntry={true}
              />
              <Row style={styles.btnContainer}>
                <Form.Button
                  buttonName='Submit'
                  disabled={!formState?.isValid || formState?.isSubmitting}
                  onSubmit={handleSubmit}
                />
                <Form.Button
                  buttonName='Go back'
                  onPress={() => handleSwitchScreen(Screens.LOGIN)}
                />
              </Row>
            </>
          ) : (
            <>
              <Form.TextInput
                name='email'
                errMsg='Valid email is required'
                rules={{
                  required: true,
                  pattern: /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,3}$/,
                }}
                placeholderText='Email'
              />
              <Form.TextInput
                name='password'
                errMsg='Valid password is required'
                rules={{ required: true }}
                placeholderText='Password'
                secureTextEntry={true}
              />
              <Row style={styles.btnContainer}>
                <Form.Button
                  buttonName='Submit'
                  disabled={!formState?.isValid || formState?.isSubmitting}
                  onSubmit={handleSubmit}
                />
                <Form.Button
                  buttonName='Sign up'
                  onPress={() => handleSwitchScreen(Screens.SIGNUP)}
                />
                <Form.Button
                  buttonName='Reset'
                  onPress={() => handleSwitchScreen(Screens.RESET)}
                />
              </Row>
            </>
          )}
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
