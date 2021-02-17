import { Alert } from 'react-native';
import { PermissionType, askAsync, getAsync } from 'expo-permissions';

export { CAMERA, NOTIFICATIONS } from 'expo-permissions';

export async function getUserPermission(
  permissionType: PermissionType,
  message: string
): Promise<boolean> {
  const { status: existingStatus } = await getAsync(permissionType);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await askAsync(permissionType);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Insufficient persmission', message, [{ text: 'Okay' }]);
    return false;
  }
  return true;
}
