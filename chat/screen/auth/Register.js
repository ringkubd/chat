import React, {useEffect} from "react";
import {Text, View} from "react-native";
import UnAuthorizedLayout from "../../components/Layout/UnAuthorizedLayout";
import {ErrorMessage, Formik} from "formik";
import * as Yup from 'yup';
import {Button, TextInput} from "react-native-paper";
import {useRegisterMutation} from "../../store/service/auth/authAPI";

const Register = () => {

    const [register, registerResponse] = useRegisterMutation();

    useEffect(() => {
        if (!registerResponse.isError && registerResponse.isSuccess){
            console.log(registerResponse)
        }
    }, [registerResponse]);
    const submit = (values, helperProps) => {
        helperProps.setSubmitting(true);
        register(values);
        helperProps.setSubmitting(false)
    }


    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label('Name'),
        email: Yup.string().email().required().label('Email'),
        password: Yup.string().required().label('Password'),
    });
    return (
        <UnAuthorizedLayout style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Formik initialValues={{email: '', password: '', name: ''}} onSubmit={submit} validationSchema={validationSchema}>
                {
                    ({handleChange, handleSubmit, values, setFieldValue, errors, isSubmitting}) => (
                        <View style={{ flex: 1, paddingHorizontal: 5}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TextInput
                                    label={'Name'}
                                    id={'name'}
                                    name={'name'}
                                    onChangeText={(text) => setFieldValue('name', text)}
                                    value={values.name}
                                />
                                <ErrorMessage name='name' render={(msg) => <Text style={{color: 'red'}}>{msg}</Text>} />
                            </View>
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
                               <Button onPress={handleSubmit} loading={isSubmitting} mode={'contained'}>Register</Button>
                            </View>
                        </View>
                    )
                }
            </Formik>
        </UnAuthorizedLayout>
    )
}

export default Register;
