import React from 'react';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { ViewStyle, StyleSheet, StyleProp } from 'react-native';
import { Button as NativeElementButton, ButtonProps as BtnProps } from 'react-native-elements';

export interface ButtonProps<T> extends BtnProps {
  onSubmit?: SubmitHandler<T>;
  handlePress?: () => void;
  buttonContainer?: StyleProp<ViewStyle>;
}

export const Button = <TFormValues extends Record<string, any>>({
  onSubmit,
  handlePress,
  buttonContainer,
  ...rest
}: ButtonProps<TFormValues>): JSX.Element => {
  const context = useFormContext();

  return (
    <NativeElementButton
      containerStyle={[defaultStyles.buttonContainer, buttonContainer]}
      onPress={handlePress || (onSubmit && context.handleSubmit(onSubmit))}
      {...rest}
    />
  );
};

interface Styles {
  buttonContainer: ViewStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  buttonContainer: {
    marginVertical: 10,
    minWidth: 150,
    padding: 10,
  },
});
