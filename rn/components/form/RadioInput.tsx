import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { ListItem, Text, Input } from 'react-native-elements';

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
        <Text style={{ marginLeft: 20, marginVertical: 10 }}>{header}</Text>
      )}
      <ListItem onPress={handlePress}>
        {options.map((option: RadioOption) => (
          <View key={option.id} style={{ justifyContent: 'space-evenly' }}>
            <Text> {option.label}</Text>
            <Input
              //selected={value === option.value}
              //color={option.color}
              //selectedColor={option.selectedColor}
            />
          </View>
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
