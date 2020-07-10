import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Camera} from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function test(){
    const camRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(()=>{
        (async ()=>{
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })();
    },[]);

    if (hasPermission === null) {
        return <View/>
    }

    if (hasPermission === false) {
        return <Text> Hello World!</Text>
    }

    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            console.log(data);
            
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref= {camRef}
            >
                <View style={styles.cameraContent}>
                    <TouchableOpacity 
                        style={styles.cameraSwitch}
                        onPress={()=>{
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            )
                        }}>
                        <Text style={{fontSize:20, marginBottom:13, color: '#fff'}}>Trocar</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <TouchableOpacity style={styles.cameraCapture} onPress={takePicture}>
                <FontAwesome name="camera" size={23} color='#FFF'/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1
    },
    cameraContent: {
        flex: 1,                
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    cameraSwitch: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    cameraCapture: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: '20',
        borderRadius: 10,
        height: 50,
    }
})