import { ImagePickerResult, launchCameraAsync } from 'expo-image-picker';
import { getUserPermission, CAMERA } from './getUserPermission';

export async function openCameraWithUserPermission(allowsEditing: boolean = true) {
  try {
    const hasPermission = await getUserPermission(
      CAMERA,
      'Please grant permission to use camera.'
    );
    if (!hasPermission) return;
    const result: ImagePickerResult = await launchCameraAsync({
      allowsEditing: allowsEditing,
      aspect: [16, 9],
      quality: 0.5,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}
