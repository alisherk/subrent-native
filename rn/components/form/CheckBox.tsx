import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { CheckBox as NativeCheckbox, Text } from 'react-native-elements';

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
      <Text>
        {checkBoxOptionsTitle}
      </Text>
      <View>
        {options.map((option: CheckBoxOption) => (
          <View
            key={option.id}
            style={{ justifyContent: 'space-evenly' }}
          >
            <NativeCheckbox
              checked={value === option.value}
            />
            <Text> {option.label}</Text>
          </View>
        ))}
      </View>
      <View>
        {error && (
          <Text style={{ color: 'red' }}>{error}</Text>
        )}
      </View>
    </>
  );
};
