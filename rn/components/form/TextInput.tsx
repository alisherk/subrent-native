import React from 'react';
import { View } from 'react-native';
import { Rules } from './types';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Text } from 'react-native-elements';
import {
  TextInputProps as InputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface TextInputProps extends InputProps {
  name: string;
  rules: Rules;
  defaultValue?: string;
  label?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<TextStyle>;
}

export const TextInput = ({
  name,
  rules,
  defaultValue = '',
  label,
  inputContainerStyle,
  errorContainerStyle,
  ...rest
}: TextInputProps): JSX.Element => {
  const { errors, control } = useFormContext();
  return (
    <Controller
      control={control}
      render={({ onChange, value, onBlur }) => (
        <View style={[defaultStyles.inputContainerStyle, inputContainerStyle]}>
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            onBlur={onBlur}
            {...rest}
          />
          {label && <Text> {label}</Text>}
          <View
            style={[defaultStyles.errorContainerStyle, errorContainerStyle]}
          >
            {errors[name] && (
              <Text testID='error' style={defaultStyles.errorColor}>
                {errors[name].message}
              </Text>
            )}
          </View>
        </View>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};

interface Styles {
  inputContainerStyle: ViewStyle;
  errorContainerStyle: TextStyle;
  errorColor: TextStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  inputContainerStyle: { height: 80 },
  errorContainerStyle: { marginLeft: 5 },
  errorColor: { color: 'red' },
});
