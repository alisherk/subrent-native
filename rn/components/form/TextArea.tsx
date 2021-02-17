import React from 'react';
import { Row, Text, Item, Textarea as NativeBaseTextArea } from 'native-base';
import { Rules } from './types';
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
          <Item>
            <NativeBaseTextArea
              rowSpan={rows}
              bordered
              underline
              onChangeText={(value) => onChange(value)}
              value={value}
              onBlur={onBlur}
              placeholder={placeholderText}
              style={{ width: '100%' }}
            />
          </Item>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <Row style={{ marginLeft: 15, padding: 5 }}>
        {errors[name] && (
          <Text style={{ color: 'red' }}>{errors[name].message}</Text>
        )}
      </Row>
    </>
  );
};
