import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated, TouchableOpacity, Button, Image } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import {withNavigation} from 'react-navigation'


class AddButton extends React.Component {


    render() {

        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <View style={[styles.button]}>
                    <TouchableOpacity style={[styles.button]} onPress={()=>this.props.navigation.navigate('Dashboard')} underlayColor="#fff">
                        <Image source = {require('../assets/icon-2.png')} style = {{ width: 50, height: 50}}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withNavigation(AddButton);

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#173f5f",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#7F58FF"
    }
});