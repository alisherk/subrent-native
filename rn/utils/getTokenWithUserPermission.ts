import { getExpoPushTokenAsync } from 'expo-notifications';
import { getUserPermission, NOTIFICATIONS } from './getUserPermission';

export async function getTokenWithUserPermission(): Promise<string | undefined> {
  try {
    const hasPermission = await getUserPermission(
      NOTIFICATIONS,
      'Please grant permission to receive notifications'
    );
    if (!hasPermission) return;
    return (await getExpoPushTokenAsync()).data;
  } catch (err) {
    console.log(err);
  }
}
