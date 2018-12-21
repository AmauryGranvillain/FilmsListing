import { AsyncStorage } from "react-native"

export const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('key', JSON.stringify(data));
    } catch (error) {
      console.log(error)
    }
}

export const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        console.log(value);
        return JSON.parse(value)
      }
     } catch (error) {
        console.log(error)
     }
}