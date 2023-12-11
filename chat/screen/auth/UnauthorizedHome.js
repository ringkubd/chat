import {View} from "react-native";
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import UnAuthorizedLayout from "../../components/Layout/UnAuthorizedLayout";

const UnauthorizedHome = () => {
    const navigation = useNavigation();
    return (
        <UnAuthorizedLayout style={{flex: 1, justifyContent: 'center', alignContent: 'center', marginVertical: 10}}>
            <Button style={{marginVertical: 10}} mode={'contained'} onPress={() => navigation.navigate('Login')}>Login</Button>
            <Button style={{marginVertical: 10}} mode={'contained'} onPress={() => navigation.navigate('Register')}>Register</Button>
        </UnAuthorizedLayout>
    )
}
export default UnauthorizedHome;
