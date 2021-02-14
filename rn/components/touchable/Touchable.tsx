import React from 'react';
import {
  TouchableOpacity,
  StyleProp, 
  ViewStyle
} from 'react-native';


interface TouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>
  testID?: string; 
}

export const Touchable = ({ children, onPress, style, testID  }: TouchableProps) => (
  <TouchableOpacity testID={testID} style={style} onPress={onPress}>{children}</TouchableOpacity>
);
