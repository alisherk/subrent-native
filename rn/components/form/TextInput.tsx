import React from 'react';
import { Rules } from './types';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from 'react-native-elements';

export interface TextInputProps extends InputProps {
  name: string;
  rules: Rules;
  defaultValue?: string;
}

export const TextInput = ({
  name,
  rules,
  defaultValue = '',
  ...rest
}: TextInputProps): JSX.Element => {
  const { errors, control } = useFormContext();
  return (
    <Controller
      control={control}
      render={({ onChange, value, onBlur }) => (
        <Input
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
          errorMessage={errors[name]?.message}
          inputContainerStyle={{ height: 50}}
          {...rest}
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
