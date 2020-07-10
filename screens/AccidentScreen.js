import React from 'react';
import { AsyncStorage,TouchableOpacity, TextInput, StyleSheet, Text, View, Animated, ScrollView, Alert, Button } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";

export default class Accident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
        <View style={style.parent}>
            <Text style={style.title}>ATLANTAS</Text>
            <View style={style.container}>
                <View style={[style.child, {backgroundColor: '#996666'} ]} />
                <View style={[style.child, {backgroundColor: '#339966'} ]} />
                <View style={[style.child, {backgroundColor: '#996633'} ]} />
                <View style={[style.child, {backgroundColor: '#669933'} ]} />
            </View>
        </View>
        
    );
  }
}

var style = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#173f5f'
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
    }
})
