import AsyncStorage from '@react-native-community/async-storage';

export const storeUserAuthData = async (
  value: firebase.User,
  key: string = 'auth'
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserAuthData = async (): Promise<firebase.User> => {
  try {
    const jsonValue = await AsyncStorage.getItem('auth');    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err.message);
    return err; 
  }
};

export const removeUserAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('auth');
  } catch (err) {
    console.log(err.message);
  }
};
