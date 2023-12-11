import {dispatch} from "../store";
import {setErrors} from "../store/service/error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Database {
    /**
     *
     * @param key
     * @param value
     * @returns {Promise<void>}
     */
    async storeData(key, value){
        try {
            if (typeof value === "string"){
                await AsyncStorage.setItem(key, value);
            }else {
                await AsyncStorage.setItem(key, JSON.stringify(value));
            }
        }catch (e) {
            dispatch(setErrors({message: 'Store error', status: 10001}))
        }
    }

    /**
     *
     * @param key
     * @returns {Promise<string>}
     */
    async getData(key){
        return await AsyncStorage.getItem(key).then(r => r);
    }

    /**
     *
     * @param key
     * @returns {Promise<void>}
     */

    async removeData(key){
        return await AsyncStorage.removeItem(key);
    }
}
