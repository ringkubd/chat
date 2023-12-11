import React, {useEffect} from "react";
import {Text, View} from "react-native";
import UnAuthorizedLayout from "../../components/Layout/UnAuthorizedLayout";
import {useLoginMutation} from "../../store/service/auth/authAPI";
import * as Yup from "yup";
import {Button, TextInput} from "react-native-paper";
import {ErrorMessage, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {setAuthCredentials} from "../../store/service/auth/authSlice";
import {useAuth} from "../../hooks/useAuth";
import Database from "../../lib/Database";

const database = new Database();
const Login = () => {
    const dispatch = useDispatch();
    const [login, loginResponse] = useLoginMutation();
    const token = useSelector(state => state.auth);
    const auth = useAuth(true);

    useEffect(() => {
        if (!loginResponse.isError && loginResponse.isSuccess){
            dispatch(setAuthCredentials(loginResponse.data?.data))
            const {user, token } = loginResponse.data?.data;
            database.storeData('token', token)
            database.storeData('user', user)
            console.log(token)
        }
    }, [loginResponse]);
    const submit = (values, helperProps) => {
        helperProps.setSubmitting(true);
        login(values);
        helperProps.setSubmitting(false)
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required().label('Email'),
        password: Yup.string().required().label('Password'),
    });
    return (
        <UnAuthorizedLayout>
            <Formik initialValues={{email: '', password: ''}} onSubmit={submit} validationSchema={validationSchema}>
                {
                    ({handleChange, handleSubmit, values, setFieldValue, errors, isSubmitting}) => (
                        <View style={{ flex: 1, paddingHorizontal: 5}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TextInput
                                    label={'Email'}
                                    keyboardType={'email-address'}
                                    id={'email'}
                                    name={'email'}
                                    onChangeText={(text) => setFieldValue('email', text)}
                                    value={values.email}
                                />
                                <ErrorMessage name='password' render={(msg) => <Text style={{color: 'red'}}>{msg}</Text>} />
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TextInput
                                    label={'Password'}
                                    id={'password'}
                                    name={'password'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => setFieldValue('password', text)}
                                    value={values.password}
                                />
                                <ErrorMessage name='password' render={(msg) => <Text style={{color: 'red'}}>{msg}</Text>} />
                            </View>
                            <View style={{flex: 1}}>
                                <Button onPress={handleSubmit} loading={isSubmitting} mode={'contained'}>Login</Button>
                            </View>
                        </View>
                    )
                }
            </Formik>
        </UnAuthorizedLayout>
    )
}

export default Login;
