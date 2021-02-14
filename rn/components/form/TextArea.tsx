import React from 'react';
import { Row, Text, Item, Textarea as NativeBaseTextArea } from 'native-base';
import { Controller, useFormContext, ValidationRules } from 'react-hook-form';

export interface TextAreaProps {
  name: string;
  rows: number;
  errMsg: string;
  defaultValue?: string;
  placeholderText?: string;
  label?: string;
  rules: ValidationRules;
}

export const TextArea = ({
  placeholderText,
  name,
  rules,
  defaultValue = '',
  errMsg,
  rows
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
            style={{ width: '100%'}}
          />
          </Item>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <Row style={{ marginLeft: 15, padding: 5 }}>
        {errors[name] && <Text style={{ color: 'red' }}>{errMsg}</Text>}
      </Row>
    </>
  );
};
