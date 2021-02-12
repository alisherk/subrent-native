import React from 'react';
import { ListItem, Text, Label, Radio, Row } from 'native-base';

export type RadioOption = {
  id: number;
  value: string;
  label: string;
  color: string;
  selectedColor: string;
};

export interface RadioInputProps {
  header?: string;
  value: string;
  options: RadioOption[];
  handlePress: () => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  header,
  value,
  options,
  handlePress,
}): JSX.Element => {
  return (
    <>
      {header && (
        <Label style={{ marginLeft: 20, marginVertical: 10 }}>{header}</Label>
      )}
      <ListItem selected={true} onPress={handlePress}>
        {options.map((option: RadioOption) => (
          <Row key={option.id} style={{ justifyContent: 'space-evenly'}}>
            <Text> {option.label}</Text>
            <Radio
              selected={value === option.value}
              color={option.color}
              selectedColor={option.selectedColor}
            />
          </Row>
        ))}
      </ListItem>
    </>
  );
};
