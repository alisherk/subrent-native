import React from 'react';
import {
  TouchableOpacity,
  StyleProp, 
  ViewStyle
} from 'react-native';


interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>
  testID?: string; 
}

export const Touchable: React.FC<Props> = ({ children, onPress, style, testID  }) => (
  <TouchableOpacity testID={testID} style={style} onPress={onPress}>{children}</TouchableOpacity>
);
