import React from 'react';
import { View, Text, TextInput,Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import {FlatButtonRegister} from '../shared/ButtonShared';

const formValidation = yup.object({
    name: yup.string().required().min(4),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    cpassword: yup.string().required()
    .test('passwords-match', "Confirm password doesn't match", function(value) {
      return this.parent.password === value;
    }),
});

export default function RegisterForm({addUser}){
    const newUser = (props) => {
    
        return fetch('http://192.168.100.15/atlantas/services/register.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: props.name,
                email: props.email,
                password: props.password
            }), 
        }).then((response) => {
            
            
            var json = response.json(); 
            return json;
        })
        .then((responseJson)=>{
            if (responseJson == '1') {
                Alert.alert(
                    'Success',
                   'username: ' + props.name + ' or email: ' + props.email + ' registered successfully!',
                    [
                      {text: 'Close'},
                    ],
                    {cancelable: false},
                  );
                return addUser(props);
            } else {
                Alert.alert(
                    'Error',
                   'username: ' + props.name + ' or email: ' + props.email + ' already exsist!',
                    [
                      {text: 'Close'},
                    ],
                    {cancelable: false},
                  );
                  return addUser(props);
            }
            
        })
        .catch(error=>{
            Alert.alert(error);
        })
    }
    return (
        <Formik
            initialValues={{name: '', email: '', password: '', cpassword: ''}}
            validationSchema={formValidation}
            onSubmit={(value, action) => {
                newUser(value);
                action.resetForm(true);
            }}>
                {(props) => (
                    <View>
                        <Text style={globalStyles.titleText}>Username</Text>
                        <TextInput 
                            style={globalStyles.inputRegist}
                            placeholder='Please enter your Name...'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                            onBlur={props.handleBlur('name')} />
                        <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

                        <Text style={globalStyles.titleText}>Email</Text>
                        <TextInput
                            style={globalStyles.inputRegist}
                            placeholder='Please enter your email...'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')} />
                        <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                        
                        <Text style={globalStyles.titleText}>Password</Text>
                        <TextInput
                            style={globalStyles.inputRegist}
                            placeholder='Please enter your password...'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            onBlur={props.handleBlur('password')}
                            secureTextEntry={true} />
                        <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                        <Text style={globalStyles.titleText}>Confirm Password</Text>
                        <TextInput
                            style={globalStyles.inputRegist}
                            placeholder='Confirm password...'
                            onChangeText={props.handleChange('cpassword')}
                            value={props.values.cpassword}
                            onBlur={props.handleBlur('cpassword')}
                            secureTextEntry={true} />
                        <Text style={globalStyles.errorText}>{props.touched.cpassword && props.errors.cpassword}</Text>

                        <FlatButtonRegister text='Sign Up' onPress={props.handleSubmit}/>
                    </View>
                )}
        </Formik>
    )
}