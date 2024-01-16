import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {useAuth} from "../hooks/useAuth";
import {useSocket} from "../hooks/useSocket";
import {Pusher} from "@pusher/pusher-websocket-react-native";

const Home = () => {
    const {user, logout} = useAuth();
    const pusher = Pusher.getInstance();

     const pusherConnect = async () => {
         console.log('soketi.anwarjahid.com:443'.split(':'))
         try {
         await pusher.init({
             apiKey: 'n8cvpsqoy6i7qbomvwv7',
             useTLS: true,
             proxy: 'soketi.anwarjahid.com:443',
             onError: onError,
             onConnectionStateChange: onConnectionStateChange,
             onEvent: event => console.log(event)
         })
         await pusher.connect();
         } catch (e) {
             console.log('ERROR: ' + e);
         }
     }
    const onConnectionStateChange = (
        currentState,
        previousState
    ) => {
        console.log(
            `onConnectionStateChange. previousState=${previousState} newState=${currentState}`
        );
    };

    const onError = (message, code, error) => {
        console.log(`onError: ${message} code: ${code} exception: ${error}`);
    };

    const onEvent = (event) => {
        console.log(`onEvent: ${event}`);
    };

    const onSubscriptionSucceeded = (channelName, data) => {
        log(
            `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
        );
        const channel = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

        const me = channel.me;
        onChangeMembers([...channel.members.values()]);
        log(`Me: ${me}`);
    };

    const onSubscriptionCount = (
        channelName,
        subscriptionCount
    ) => {
        console.log(
            `onSubscriptionCount: ${subscriptionCount}, channelName: ${channelName}`
        );
    };

    const onSubscriptionError = (
        channelName,
        message,
        e
    ) => {
        console.log(`onSubscriptionError: ${message}, channelName: ${channelName} e: ${e}`);
    };

    const onDecryptionFailure = (eventName, reason) => {
        console.log(`onDecryptionFailure: ${eventName} reason: ${reason}`);
    };

    const onMemberAdded = (channelName, member) => {
        console.log(`onMemberAdded: ${channelName} user: ${member}`);
        const channel = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

    };

    const onMemberRemoved = (channelName, member) => {
        console.log(`onMemberRemoved: ${channelName} user: ${member}`);
        const channel = pusher.getChannel(channelName);

        if (!channel) {
            return;
        }

    };

    // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/ for the format of this object.
    const onAuthorizer = async (channelName, socketId) => {
        console.log(
            `calling onAuthorizer. channelName=${channelName}, socketId=${socketId}`
        );

        const response = await fetch('some_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                socket_id: socketId,
                channel_name: channelName,
            }),
        });

        const body = (await response.json());

        console.log(`response: ${JSON.stringify(body)}`);
        return body;
    };


    pusherConnect();

    return (
        <View>
            <Text>Home</Text>
            <Button mode={`contained`} onPress={() => logout()}>Logout</Button>
        </View>
    )
}

export default Home;
