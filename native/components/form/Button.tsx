import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ViewStyle, StyleSheet, StyleProp } from 'react-native';
import * as NativeBase from 'native-base';

export interface ButtonProps {
  buttonName: string;
  onSubmit?: (data: any) => void;
  handlePress?: () => void;
  disabled?: boolean;
  icon?: boolean;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
  [k: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  buttonName,
  onSubmit,
  handlePress,
  disabled,
  icon,
  iconName,
  style,
  ...rest
}): JSX.Element => {
  const context = useFormContext();

  return (
    <NativeBase.View style={defaultStyles.buttonContainer}>
      <NativeBase.Button
        style={[defaultStyles.button, style]}
        disabled={disabled}
        onPress={handlePress || (onSubmit && context.handleSubmit(onSubmit))}
        {...rest}
      >
        {icon && <NativeBase.Icon name={iconName} />}
        <NativeBase.Text>{buttonName}</NativeBase.Text>
      </NativeBase.Button>
    </NativeBase.View>
  );
};

interface Styles {
  buttonContainer: ViewStyle;
  button: ViewStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 5,
    padding: 10,
  },
});
