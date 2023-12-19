import Echo from 'laravel-echo';
import Axios from "./Axios";
import {Pusher} from "@pusher/pusher-websocket-react-native";
import {createContext} from "react";
export const PusherContext = createContext(null);

export const pusher = Pusher.getInstance();
try {
    pusher.init({
        apiKey: process.env.EXPO_PUBLIC_SOKETI_API_KEY,
        cluster: 'm2',
        onAuthorizer: async (channelName, socketId) => {
            return await Axios.post('broadcasting/auth', {
                socket_id: socketId,
                channel_name: channelName
            })
        },
        onError(message, code, e){
            console.log(`onError: $message code: ${code} exception: ${e} message= ${message}`);
        }
    })
}catch (e) {
    console.log(`ERROR: ${e}`);
}
