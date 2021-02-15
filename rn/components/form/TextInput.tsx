import React from 'react';
import { Item, Input, Row, Text, Label, View } from 'native-base';
import {
  Controller,
  useFormContext,
  ValidationRule,
  Message,
} from 'react-hook-form';

export type Rules = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
}>;

export interface TextInputProps {
  name: string;
  defaultValue?: string;
  placeholderText?: string;
  label?: string;
  rules: Rules;
  secureTextEntry?: boolean;
  testID?: string;
}

export const TextInput = ({
  placeholderText,
  name,
  rules,
  defaultValue = '',
  label,
  secureTextEntry,
  testID,
}: TextInputProps): JSX.Element => {
  const { errors, control } = useFormContext();
  return (
    <Controller
      control={control}
      render={({ onChange, value, onBlur }) => (
        <View style={{ height: 80 }}>
          <Item floatingLabel>
            <Input
              onChangeText={(value) => onChange(value)}
              value={value}
              onBlur={onBlur}
              placeholder={placeholderText}
              secureTextEntry={secureTextEntry}
              testID={testID}
            />
            {label && <Label> {label}</Label>}
          </Item>
          <Row style={{ marginLeft: 5 }}>
            {errors[name] && (
              <Text testID='error' style={{ color: 'red' }}>
                {errors[name].message}
              </Text>
            )}
          </Row>
        </View>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
