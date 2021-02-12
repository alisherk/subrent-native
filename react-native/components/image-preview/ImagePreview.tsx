import React from 'react';
import { View, Text, Icon } from 'native-base';
import { Touchable } from '../touchable';
import {
  Image,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

interface Props {
  imageUri: string | null;
  imagePreviewStyle?: StyleProp<ViewStyle>;
  deleteIcon?: boolean;
  handleOnPress: () => void;
}

export const ImagePreview: React.FC<Props> = ({
  imageUri,
  imagePreviewStyle,
  deleteIcon,
  handleOnPress,
}) => {
  return (
    <View style={defaultStyles.container}>
      <View style={[defaultStyles.imagePreview, imagePreviewStyle]}>
        {!imageUri ? (
          <Text> No image picked yet</Text>
        ) : (
          <View style={defaultStyles.image}>
            {deleteIcon && (
              <Touchable
                onPress={handleOnPress}
                style={defaultStyles.touchable}
                testID='touchable'
              >
                <Icon
                  style={defaultStyles.deleteIcon}
                  name='trash'
                />
              </Touchable>
            )}
            <Image
              testID='image'
              style={defaultStyles.image}
              source={{ uri: imageUri }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  imagePreview: ViewStyle;
  image: ImageStyle;
  touchable: ViewStyle;
  deleteIcon: TextStyle;
}

const defaultStyles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 350,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteIcon: {
    color: 'gray',
  },
  touchable: {
    position: 'absolute',
    top: 0,
    left: 170,
    zIndex: 1,
  },
});
