import React, {useEffect, useState} from 'react';
import { AsyncStorage,TouchableOpacity, TextInput, StyleSheet, Text, View, Animated, ImageBackground, Image, Button } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

// export default function DashboardScreen({navigation}){
export default class DashboardScreen extends React.Component{
    state= {
        status: 0
    }
    UNSAFE_componentWillMount(){
        this.status();
    }

    status = async() =>{
        var code = await AsyncStorage.getItem('flash');
        if (code) {
            var mes = JSON.parse(code);
            await AsyncStorage.removeItem('flash');
            this.setState({status: 1});
            return showMessage({
                message: mes.status,
                description: mes.message,
                type: mes.type,
                icon: 'success',
            });
        }else{
            this.setState({status: 0});
        }
    }

    logout = async()=> {
        await AsyncStorage.clear();

        this.props.navigation.navigate('Auth');
    }
    render(){
        return (
            <ImageBackground source={require('../assets/bg-login-2.jpg')}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    resizeMode='cover'
                    >
                <View style={style.parent}>
                    {this.state.status?<FlashMessage position="top" />:<View/>}
                    <Image source = {require('../assets/icon-2.png')} style = {{ width: 150, height: 150}}></Image>
                    {/* <Text style={style.title}>Dashboard</Text> */}
                    <View style={style.container}>
                        <TouchableOpacity style={[style.child, {backgroundColor: 'transparent'}]} onPress={() => this.props.navigation.navigate('FormTilang')}>
                            <View style={[style.card, {flex: 1}]}>
                                <View style={style.cardContent}>
                                    <FontAwesome5 name="file-alt" size={80} color="#FFF" />
                                </View>
                                <View style={style.cardContent}>
                                    <Text style={[style.title, {fontSize: 13, lineHeight:12}]}>Tilang</Text>
                                </View>  
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.child, {backgroundColor: 'transparent'} ]} onPress={() => this.props.navigation.navigate('Maps')}>
                            <View style={[style.card, {flex: 1}]}>
                                <View style={style.cardContent}>
                                    <FontAwesome5 name="map" size={80} color="#FFF" />
                                </View>
                                <View style={style.cardContent}>
                                    <Text style={[style.title, {fontSize: 13, lineHeight:12}]}>Map</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.child, {backgroundColor: 'transparent'} ]} onPress={() => this.props.navigation.navigate('Report')}>
                            <View style={[style.card, {flex: 1}]}>
                                <View style={style.cardContent}>
                                    <FontAwesome5 name="chart-bar" size={80} color="#FFF" />
                                </View>
                                <View style={style.cardContent}>
                                    <Text style={[style.title, {fontSize: 13, lineHeight:12}]}>Report</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.child, {backgroundColor: 'transparent'} ]} onPress={this.logout}>
                            <View style={[style.card, {flex: 1}]}>
                                <View style={style.cardContent}>
                                    <FontAwesome5 name="sign-out-alt" size={80} color="#FFF" />
                                </View>
                                <View style={style.cardContent}>
                                    <Text style={[style.title, {fontSize: 13, lineHeight:12}]}>Logout</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        );
    }
}
    
var style = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        opacity: 0.8
    },
    container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
    },
    child: {
        width: '35%',
        aspectRatio: 1,
        margin: 20,
        borderRadius: 20
    },
    title: {
        textShadowOffset: {
            width: 0,
            height: 4
        },
        color: 'white',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
        textShadowRadius: 4,
        letterSpacing: 5,
        textTransform: 'uppercase',
    },
    card: {
        borderRadius: 90,
        elevation: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
      },
      cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
        alignItems: 'center'
      }
})
    