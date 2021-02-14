import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ListItem, Text, Label, Radio, Row, View } from 'native-base';

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
  style?: StyleProp<ViewStyle>;
}

export const RadioInput = ({
  header,
  value,
  options,
  handlePress,
  style,
}: RadioInputProps): JSX.Element => {
  return (
    <View style={[defaultStyles.container, style]}>
      {header && (
        <Label style={{ marginLeft: 20, marginVertical: 10 }}>{header}</Label>
      )}
      <ListItem selected={true} onPress={handlePress}>
        {options.map((option: RadioOption) => (
          <Row key={option.id} style={{ justifyContent: 'space-evenly' }}>
            <Text> {option.label}</Text>
            <Radio
              selected={value === option.value}
              color={option.color}
              selectedColor={option.selectedColor}
            />
          </Row>
        ))}
      </ListItem>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    height: 50,
  },
});
