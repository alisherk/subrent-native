import React, { useEffect } from 'react';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Rules } from './types';
import {
  View,
  Icon,
  Text,
  Item,
  Row,
  Picker as NativeBasePicker,
} from 'native-base';

console.disableYellowBox = true;

export type PickerOption = { id: number; label: string; value: string };

export interface PickerInputProps {
  name: string;
  headerTitle: string;
  defaultValue?: string;
  placeholderText?: string;
  label?: string;
  rules: Rules;
  options: PickerOption[];
  specialMessage?: string;
  testID?: string;
}

export const Picker = ({
  name,
  headerTitle,
  placeholderText,
  rules,
  defaultValue = '',
  options,
  specialMessage,
  testID,
}: PickerInputProps): JSX.Element => {
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
          <View style={defaultStyles.pickerContainer}>
            <Item style={defaultStyles.item}>
              <Text> {headerTitle}: </Text>
              <NativeBasePicker
                iosIcon={<Icon name='arrow-down' />}
                placeholder={placeholderText}
                selectedValue={value}
                onValueChange={(val) => handleOnChange(val)}
                testID={testID}
              >
                {options.map((option: PickerOption) => (
                  <NativeBasePicker.Item
                    key={option.id}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </NativeBasePicker>
            </Item>
            <Row style={defaultStyles.row}>
              {errors[name] && (
                <Text style={defaultStyles.error}>{errors[name].message}</Text>
              )}
              {specialMessage && (
                <Text style={defaultStyles.message}>{specialMessage}</Text>
              )}
            </Row>
          </View>
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
