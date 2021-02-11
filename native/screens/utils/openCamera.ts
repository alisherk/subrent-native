import { ImagePickerResult, launchCameraAsync } from 'expo-image-picker';
import { PermissionType } from 'expo-permissions';

export interface IOpenCamera {
    getPermission(permissions: PermissionType[]): Promise<boolean>;
    permissions: PermissionType[];
    allowsEditing?: boolean;
  }
  
  export async function openCamera({
    getPermission,
    permissions,
    allowsEditing = false,
  }: IOpenCamera) {
    const hasPermission = await getPermission(permissions);
    if (!hasPermission) return;
    const result: ImagePickerResult = await launchCameraAsync({
      allowsEditing: allowsEditing,
      aspect: [16, 9],
      quality: 0.5,
    });
    return result;
  }; 

