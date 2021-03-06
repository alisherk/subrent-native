import React from 'react';
import { Input, Text } from 'react-native-elements';
import { Rules } from './types';
import { View } from 'react-native';
import {
  Controller,
  useFormContext,
} from 'react-hook-form';


export interface TextAreaProps {
  name: string;
  rows: number;
  defaultValue?: string;
  placeholderText?: string;
  label?: string;
  rules: Rules;
}

export const TextArea = ({
  placeholderText,
  name,
  rules,
  defaultValue = '',
  rows,
}: TextAreaProps): JSX.Element => {
  const { errors, control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        render={({ onChange, value, onBlur }) => (
          <>
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              onBlur={onBlur}
              placeholder={placeholderText}
              style={{ width: '100%' }}
            />
          </>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <View style={{ marginLeft: 15, padding: 5 }}>
        {errors[name] && (
          <Text style={{ color: 'red' }}>{errors[name].message}</Text>
        )}
      </View>
    </>
  );
};
