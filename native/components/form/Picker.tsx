import React, { useEffect } from 'react';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Controller, useFormContext, ValidationRules } from 'react-hook-form';
import * as NativeBase from 'native-base';

console.disableYellowBox = true;

export type PickerOption = { id: number; label: string; value: string };

export interface PickerInputProps {
  name: string;
  headerTitle: string;
  errMsg: string;
  defaultValue?: string;
  placeholderText?: string;
  label?: string;
  rules: ValidationRules;
  options: PickerOption[];
  specialMessage?: string;
  testID?: string; 
}

export const Picker: React.FC<PickerInputProps> = ({
  name,
  headerTitle,
  placeholderText,
  rules,
  defaultValue='',
  errMsg,
  options,
  specialMessage,
  testID,
}): JSX.Element => {
  const { errors, control, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue, { shouldValidate: true });
    else setValue(name, options[0].value, { shouldValidate: true });
  }, []);

  return (
    <Controller
      control={control}
      render={({ onChange, value }) => {
        const handleOnChange = (val: string) => {
          onChange(val);
        };

        return (
          <NativeBase.View style={defaultStyles.pickerContainer}>
            <NativeBase.Item style={defaultStyles.item}>
              <NativeBase.Text> {headerTitle}: </NativeBase.Text>
              <NativeBase.Picker
                iosIcon={<NativeBase.Icon name='arrow-down' />}
                placeholder={placeholderText}
                selectedValue={value}
                onValueChange={(val) => handleOnChange(val)}
                testID={testID}
              >
                {options.map((option: PickerOption) => (
                  <NativeBase.Picker.Item
                    key={option.id}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </NativeBase.Picker>
            </NativeBase.Item>
            <NativeBase.Row style={defaultStyles.row}>
              {errors[name] && (
                <NativeBase.Text style={defaultStyles.error}>
                  {errMsg}
                </NativeBase.Text>
              )}
              {specialMessage && (
                <NativeBase.Text style={defaultStyles.message}>
                  {specialMessage}
                </NativeBase.Text>
              )}
            </NativeBase.Row>
          </NativeBase.View>
        );
      }}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
interface Styles {
  pickerContainer: ViewStyle;
  item: ViewStyle;
  row: ViewStyle;
  message: TextStyle;
  error: TextStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  pickerContainer: {
    height: 80,
  },
  item: {
    justifyContent: 'space-between',
  },
  row: {
    marginLeft: 5,
  },
  message: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});
