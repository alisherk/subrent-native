import React, { useState, useEffect } from 'react';
import { StyleSheet, ViewStyle, View, TouchableNativeFeedback } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Form } from 'components/form';
import { LoginFields } from './LoginFields';
import { SignUpFields } from './SignUpFields';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { LoginScreenProps } from 'navigation';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/actions';
import { FontAwesome } from '@expo/vector-icons';

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
        <Button
          icon={<Icon name='arrow-back' color='white' />}
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
        return;
      }
      if (screen === Screens.SIGNUP) {
        await dispatch(actions.registerUser(formValues));
      } else {
        await dispatch(actions.loginUser(formValues));  
      } 
    } catch (err) {}
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    try {
      await dispatch(actions.loginWithGoogle());
    } catch (err) {}
  };

  return (
    <Form>
      {(formState) => (
        <>
          <RenderInputByScreen
            screen={screen}
            onPress={() => handleSwitchScreen(Screens.RESET_PASSWORD)}
          />
          <View style={styles.btnContainer}>
            <Form.Button
              title='Submit'
              disabled={!formState?.isValid || formState?.isSubmitting}
              onSubmit={handleSubmit}
            />
            <Form.Button
              title={screen === Screens.LOGIN ? 'Sign up' : 'Go back'}
              onPress={() => handleSwitchScreen()}
              type='outline'
            />
          </View>
          <Form.Button
            handlePress={handleLoginWithGoogle}
            type='outline'
            containerStyle={{ alignItems: 'center', padding: 0}}
            buttonStyle={{ width: 80, borderRadius: 100, height: 80}}
            icon={<FontAwesome name='google' size={40} color='crimson' />}
          />
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
    flexDirection: 'row',
  },
  googleBtnContainer: {
    justifyContent: 'center',
    marginTop: 10,
  },
});
