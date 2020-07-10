import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground} from 'react-native';

export function FlatButtonLogin({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={buttonStyles.buttonLogin}>
                <Text style={buttonStyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export function FlatButtonRegister({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={buttonStyles.buttonRegister}>
                <Text style={buttonStyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const buttonStyles = StyleSheet.create({
    buttonLogin: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'black',

    },
    buttonRegister: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#ffd868'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})