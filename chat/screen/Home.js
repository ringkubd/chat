import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {useAuth} from "../hooks/useAuth";

const Home = () => {
    const {user, logout} = useAuth();
    return (
        <View>
            <Text>Home</Text>
            <Button mode={`contained`} onPress={() => logout()}>Logout</Button>
        </View>
    )
}

export default Home;
