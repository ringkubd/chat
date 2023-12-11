import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Register from "../../screen/auth/Register";
import {useAuth} from "../../hooks/useAuth";
import Login from "../../screen/auth/Login";
import Home from "../../screen/Home";
import {navigationRef} from "../../lib/RootNavigation";
import UnauthorizedHome from "../../screen/auth/UnauthorizedHome";

const Stack = createNativeStackNavigator();
const Navigation = () => {
    const { user } = useAuth();
    console.log(user)
    return (
        <NavigationContainer ref={navigationRef}>
            {
                !user ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name={'UnauthorizedHome'}
                            component={UnauthorizedHome}
                        />
                        <Stack.Screen
                            name={'Login'}
                            component={Login}
                        />
                        <Stack.Screen
                            name={'Register'}
                            component={Register}
                        />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen
                            name={'Home'}
                            component={Home}
                        />
                        <Stack.Screen
                            name={'UnauthorizedHome'}
                            component={UnauthorizedHome}
                        />
                    </Stack.Navigator>
                )
            }

        </NavigationContainer>
    )
}
export default Navigation;
