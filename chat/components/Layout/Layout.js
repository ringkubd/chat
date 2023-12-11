import {View} from "react-native";

const Layout = ({style, children}) => {
    return (
        <View style={[style, {flex: 1}]}>
            {children}
        </View>
    )
}
export default Layout;
