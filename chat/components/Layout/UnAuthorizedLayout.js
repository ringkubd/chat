import {KeyboardAvoidingView} from "react-native";

const UnAuthorizedLayout = ({style, children}) => {
    return (
        <KeyboardAvoidingView style={[style, {flex: 1}]}>
            {children}
        </KeyboardAvoidingView>
    )
}

export default UnAuthorizedLayout;
