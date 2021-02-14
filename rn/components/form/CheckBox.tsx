import React from 'react';
import { GestureResponderEvent } from 'react-native';
import * as NativeBase from 'native-base';

export type CheckBoxOption = { id: number; value: string; label: string };

export interface CheckBoxProps {
  checkBoxOptionsTitle: string;
  value: string;
  error: string;
  options: CheckBoxOption[];
  handlePress: (e: GestureResponderEvent, value: string) => void;
};

export const CheckBox = ({
  checkBoxOptionsTitle,
  value,
  options,
  error,
  handlePress,
}: CheckBoxProps): JSX.Element => {
  return (
    <>
      <NativeBase.Label style={{ marginLeft: 20, marginVertical: 10 }}>
        {checkBoxOptionsTitle}
      </NativeBase.Label>
      <NativeBase.ListItem>
        {options.map((option: CheckBoxOption) => (
          <NativeBase.Row
            key={option.id}
            style={{ justifyContent: 'space-evenly' }}
          >
            <NativeBase.CheckBox
              checked={value === option.value}
              onPress={(e: GestureResponderEvent) =>
                handlePress(e, option.value)
              }
            />
            <NativeBase.Text> {option.label}</NativeBase.Text>
          </NativeBase.Row>
        ))}
      </NativeBase.ListItem>
      <NativeBase.Row style={{ marginLeft: 12, padding: 5 }}>
        {error && (
          <NativeBase.Text style={{ color: 'red' }}>{error}</NativeBase.Text>
        )}
      </NativeBase.Row>
    </>
  );
};
