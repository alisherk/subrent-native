import { Alert } from 'react-native';
import { PermissionType, askAsync } from 'expo-permissions';

export async function getPermission(
    permissions: PermissionType[]
  ): Promise<boolean> {
    const result = await askAsync(...permissions);
    if (result.status !== 'granted') {
      Alert.alert('Insufficient persmission', 'Please grant camera permission', [
        { text: 'Okay' },
      ]);
      return false;
    }
    return true;
  };

  export { CAMERA } from 'expo-permissions';