import React from "react";
import { StyleSheet, View, ActivityIndicator, StatusBar, Text, TouchableOpacity, Image } from "react-native";
import { AsyncStorage } from "react-native";
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapsScreen from './screens/MapsScreen'
import {DetailPelanggaran, PrintTilang, DataPelanggar} from './screens/InfringementScreen';
import AccidentScreen from './screens/AccidentScreen';
import ReportScreen from './screens/ReportScreen';
import ReportDetailScreen from './screens/ReportDetailScreen';
import { createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AddButton from "./shared/MidTabBarShared";
import { FontAwesome5 } from "@expo/vector-icons";



// const contentApp = createAppContainer(TabNavigator)



// export const contentExport = contentApp;

// export default createAppContainer(LoginRoute);

// MainNav
const TabNavigator = createBottomTabNavigator({
        Maps: {
            screen: MapsScreen,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="map-marked-alt" size={24} color="#CDCCCE" />,
            }
        },
        DB: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarIcon: () => (<AddButton/>),
                tabBarVisible: false
            }
        },
        DBa: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarIcon: () => (<FontAwesome5 name="calendar" size={24} color="#CDCCCE" />),
                tabBarVisible: false
            }
        },
    },{
      initialRouteName: 'Maps',
      activeColor: '#F44336',
      tabBarOptions: {
        showLabel: false,
        activeTintColor: 'blue'
      }
    }
);

// Route
class AuthLoadingScreen extends React.Component{
    constructor(){
        super();
        this.mainAsync();
    }

    mainAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        await AsyncStorage.removeItem('flash');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
    }
}

// Login
const AuthNav = createSwitchNavigator({
    Login: {
        screen: LoginScreen
    },
    // drawer: {
    //     screen: contentApp
    // }
});

// FormTilang
const MyCustomHeaderBackImage = () => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome5 name="times-circle" size={40} color="white" />
        {/* <Text style={{fontSize: 12, textAlign: 'center', color: 'red'}}>Cancel</Text> */}
    </View>
);

const InfringementNavigator = createStackNavigator(
    {
        FormOCR: {
            screen: DataPelanggar,
            navigationOptions: ({ navigation }) => ({
                headerBackground: () => (<Image
                        style={{width: '100%', height: '90%'}}
                        source={{ uri: 'https://www.kindpng.com/picc/m/118-1187590_mobile-app-monetization-analysis-background-header-white-hd.png' }}
                    />),
                headerRight:() =>{ 
                    return(
                        <TouchableOpacity style={{backgroundColor: 'transparent', padding: 10}} onPress={() => navigation.navigate('Dashboard')}>
                            <FontAwesome5 name="home" size={20} color='rgba(52, 52, 52, 0.8)' />
                        </TouchableOpacity> 
                    )
                },
                headerLeft: () => (
                    <View style={{flexDirection: 'row'}}>
                        <Image source = {require('./assets/icon.png')} style = {{ width: 30, height: 30, marginTop: 1, marginRight: 5,paddingLeft: 10, paddingRight: 0}}></Image>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Form Tilang</Text>
                    </View>),
                headerTitle: '',
                headerTransparent: true,
                // header: () => false
                // headerBackImage: MyCustomHeaderBackImage
            })
        },
        Detail: {
            screen: DetailPelanggaran,
            navigationOptions: {
                header: () => false
            }
        },
        printTilang: {
            screen: PrintTilang,
            navigationOptions: {
                // headerTransparent: true,
                header: () => false
            }
        }
    },{
        headerMode: 'screen',
    }
)

const ReportNavigator = createStackNavigator({
    ListReport: {
        screen: ReportScreen,
        navigationOptions: ({ navigation }) => ({
            headerBackground: () => (<Image
                    style={{width: '100%', height: '90%'}}
                    source={{ uri: 'https://www.kindpng.com/picc/m/118-1187590_mobile-app-monetization-analysis-background-header-white-hd.png' }}
                />),
            headerRight:() =>{ 
                return(
                    <TouchableOpacity style={{backgroundColor: 'transparent', padding: 10}} onPress={() => navigation.navigate('Dashboard')}>
                        <FontAwesome5 name="home" size={20} color='rgba(52, 52, 52, 0.8)' />
                    </TouchableOpacity> 
                )
            },
            headerLeft: () => (
                <View style={{flexDirection: 'row'}}>
                    <Image source = {require('./assets/icon.png')} style = {{ width: 30, height: 30, marginTop: 1, marginRight: 5,paddingLeft: 10, paddingRight: 0}}></Image>
                    <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Report</Text>
                </View>),
            headerTitle: '',
            headerTransparent: true,
        })
    },
    ReportDetail: {
        screen: ReportDetailScreen,
        navigationOptions: {
            headerTitle: 'Report Detail',
            headerBackground: () => (<Image
                style={{width: '100%', height: '90%'}}
                source={{ uri: 'https://www.kindpng.com/picc/m/118-1187590_mobile-app-monetization-analysis-background-header-white-hd.png' }}
            />),
        }
    }
});

// Dashboard
const AppNav = createSwitchNavigator({
    Dashboard: DashboardScreen,
    FormTilang: InfringementNavigator,
    Maps: TabNavigator,
    Report: ReportNavigator
})

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthNav,
        App: AppNav
    }
));

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});