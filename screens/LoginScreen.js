import React, {useState, useEffect} from 'react';
import { Alert, AsyncStorage,StyleSheet, View, TextInput, Text, Image, TouchableWithoutFeedback, Keyboard, ImageBackground, BackHandler, StatusBar } from 'react-native';
import {globalStyles} from '../styles/global';
// import { MaterialIcons } from '@expo/vector-icons';
// import RegisterForm from './RegisterForm';
import { Formik } from 'formik';
import * as yup from 'yup';
import {FlatButtonLogin} from '../shared/ButtonShared';


const formValidation = yup.object({
    nrp: yup.string().required(),
    password: yup.string().required()
});

export default function LoginScreen({navigation}){

    const [modalOpen, setModalOpen] = useState(false);
    const loginAction = async(props) => {
        return fetch('http://192.168.1.17:8000/api/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nrp: props.nrp,
                password: props.password
            }), 
        }).then(response => response.json())
        .then(responseJson=>{
            if (responseJson.code == '0') {
                Alert.alert(
                    'Oops!',
                    responseJson.message,
                    [
                      {text: 'Close'},
                    ],
                    {cancelable: false},
                  );
            } else {
                console.log(responseJson);
                var nama = responseJson.nama;
                
                AsyncStorage.setItem('userToken', JSON.stringify(responseJson));
                signIn(nama);       
            }  
        })
        .catch(error=>{
            Alert.alert(error);
        })
    }
    const signIn = async (nama) => {
        // await AsyncStorage.setItem('userToken', 'asd');
        await AsyncStorage.setItem('flash', JSON.stringify({code: 2,status: 'Login Success!', message: 'Selamat Datang '+ nama+'!', type: 'success'}));
        navigation.navigate('App');
    }

    const addUser = (newUser) => {
        return setModalOpen(false);
    };

    useEffect(() => {

        StatusBar.setHidden(true);

        const backAction = async () => {
            BackHandler.exitApp();
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    

    return (
        <View style={globalStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <ImageBackground source={require('../assets/bg-login-2.jpg')}
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                }}
                resizeMode='cover'
                >
                    <View style={globalStyles.formLogin}>
                    <Image source = {require('../assets/icon.png')} style = {{ width: 150, height: 150}}></Image>
                    <Formik
                        initialValues={{nrp: '', password: ''}}
                        validationSchema={formValidation}
                        onSubmit={(value) => {
                            loginAction(value);
                        }}>
                            {(props) => (
                                <View style={{width: '100%', flex: 1}}>
                                    <Text style={globalStyles.titleText}>NRP :</Text>
                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Silahkan masukan NRP...'
                                        onChangeText={props.handleChange('nrp')}
                                        value={props.values.nrp}
                                        autoCapitalize= 'none'
                                        onBlur={props.handleBlur('nrp')} />
                                    <Text style={globalStyles.errorText}>{props.touched.nrp && props.errors.nrp}</Text>
                                    
                                    <Text style={globalStyles.titleText}>Password :</Text>
                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Silahkan masukan password...'
                                        onChangeText={props.handleChange('password')}
                                        autoCapitalize= 'none'
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                        secureTextEntry={true} />
                                    <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                                    <FlatButtonLogin text='Login' onPress={props.handleSubmit}/>
                                </View>
                            )}
                        </Formik>
                        {/* <Text style={styles.text}>Don't have an account? <Text style={styles.textLink} onPress={function(){setModalOpen(true)}}> Sign up</Text> now!</Text> */}
                    </View>
                    
                </ImageBackground>
                {/* <Modal transparent={true} visible={modalOpen} animationType='fade'>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalSize}>
                                    <MaterialIcons 
                                    name='close'
                                    size={24} 
                                    style={{...styles.modalToggle, ...styles.modalClose}} 
                                    onPress={() => setModalOpen(false)} 
                                    />
                                    <Text style={{fontSize:25, color:'white', fontWeight:'bold', textAlign: 'center'}}>Register</Text>
                                    <RegisterForm addUser={addUser}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal> */}
            </View>
        </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    modalToggle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      opacity: 0.7,
      color: 'white',
      borderColor: 'white',
      borderWidth: 2,
      padding: 3,
      borderRadius: 10,
      alignSelf: 'flex-end',
    },
    modalSize: {
        width: '80%',
        height: '80%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalClose: {
    //   marginTop: 20,
      marginBottom: 0,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0
    },
    text: {
        paddingTop: 10,
        // fontFamily: 'oxanium-regular',
        fontSize: 16,
        color: 'white'
    },
    textLink: {
        color: 'yellow',
    }
  });