import React from 'react'
import {StyleSheet} from 'react-native'

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        backgroundColor: 'white',
    },
    titleText: {
        // fontFamily: 'oxanium-bold',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        // width: '90%',
        color: 'black',
        padding: 10,
        borderRadius: 6,
        fontSize: 14,
        marginBottom: 0
    },
    inputRegist: {
        borderWidth: 1,
        borderColor: '#ddd',
        color: 'black',
        padding: 5,
        borderRadius: 6,
        fontSize: 18,
        marginBottom: 0
    },
    errorText: {
        color: 'crimson',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 0,
        textAlign: 'center',
        alignSelf: "stretch"
    },
    formLogin: {
        // overflow: "visible",
        padding: 100,
        borderRadius:20,
        alignItems: 'center',
        // opacity: 0.8,
        // zIndex: ,
        // backgroundColor: '#274b87'
    }
  });