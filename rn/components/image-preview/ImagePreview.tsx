import React from 'react';
import { Text, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {
  Image,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleProp,
  View
} from 'react-native';

interface ImagePreviewProps {
  imageUri: string | null;
  imagePreviewStyle?: StyleProp<ViewStyle>;
  deleteIcon?: boolean;
  handleOnPress: () => void;
}

export const ImagePreview = ({
  imageUri,
  imagePreviewStyle,
  deleteIcon,
  handleOnPress,
}: ImagePreviewProps) => {
  return (
    <View style={defaultStyles.container}>
      <View style={[defaultStyles.imagePreview, imagePreviewStyle]}>
        {!imageUri ? (
          <Text> No image picked yet</Text>
        ) : (
          <View style={defaultStyles.image}>
            {deleteIcon && (
              <TouchableOpacity
                onPress={handleOnPress}
                style={defaultStyles.touchable}
                testID='touchable'
              >
                <Icon
                  style={defaultStyles.deleteIcon}
                  name='trash'
                />
              </TouchableOpacity>
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
