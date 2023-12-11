import useSWR from "swr";
import axios from "../lib/Axios";
import {useEffect} from "react";
import {navigate} from "../lib/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAuth = (guest=false) => {
    const {data: user, error, mutate} = useSWR("/user", () =>
        axios
            .get("/user")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error
            }),
    )

    console.log(error)
    const logout = async () => {
        await AsyncStorage.clear();
        await AsyncStorage.getAllKeys().then(r => console.log(r))
        await mutate();
        navigate('UnauthorizedHome')
    }
    useEffect(() => {
        if (!guest && user){
            navigate('Home')
        }
        if (!guest && !user){
            navigate('UnauthorizedHome')
        }
        if (guest && user){
            navigate('Home')
        }
    }, [user])

    return {
        user,
        logout
    }
}
