import Axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {dispatch} from "../store";
import {setAuthCredentials} from "../store/service/auth/authSlice";

const axios = Axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
    withCredentials: true,
})
axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = "Bearer "+token
            dispatch(setAuthCredentials({token}))
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
export default axios;
