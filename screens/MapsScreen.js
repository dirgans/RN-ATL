import React, {useState, Component } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, AsyncStorage, View, TouchableWithoutFeedback, PermissionsAndroid, Alert} from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import {FlatButtonLogin} from '../shared/ButtonShared';
import MapView, { Marker, Heatmap } from 'react-native-maps';



export default class Dashboard extends React.Component{
    state = {
      latitude: 0,
      longitude: 0,
      heatmap: [],
      loadHeatmap: false
    }
    
    UNSAFE_componentWillMount(){
      this.findCoordinates();
      this.getLaka();
      this.render();
    }

    getLaka = async () => {
      const {heatmap} = this.state;
      const result = [];
      // console.log(heatmap.length);
      // console.log(heatmap);
      try {
        let url = 'http://192.168.100.4:8001/api/get_maps';
        let response = await fetch(url);
        let json = await response.json();
        for(const value of json){
          var long = parseFloat(value.longitude);
          var lat = parseFloat(value.latitude);
          console.log(typeof(long));
          var w = parseFloat(value.nilai);
          result.push(
            {latitude:long, longitude:lat, weight: w}
          )
        }
        this.setState({heatmap: result})
        if (result.length > 0) {
          this.setState({loadHeatmap: true});
          console.log('asdasda');
        }
        // console.log(this.state.heatmap.length);
        // await AsyncStorage.setItem('listPelanggaran', JSON.stringify(json));
      } catch (error) {
        console.log(error);     
      }
    }

    findCoordinates = () => {
      
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = [position.coords.latitude, position.coords.longitude];
          this.setState({latitude: location[0]});
          this.setState({longitude: location[1]});          
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     );
    }
    render(){
      const {heatmap, loadHeatmap} = this.state;
      console.log(heatmap);
      console.log(loadHeatmap);
      let points = [
        {latitude:-6.390609, longitude:106.852051, weight: 1000},
        {latitude:-6.377146, longitude:106.831927, weight: 100},
        {latitude:-6.379734, longitude:106.830858, weight: 300},
        {latitude:50.061389, longitude:19.938333, weight: 8},
        {latitude:50.174722, longitude:20.986389, weight: 11},
        {latitude:50.064507, longitude:19.920777, weight: 98},
        {latitude:49.3, longitude:19.95, weight: 41},
        {latitude:49.833333, longitude:19.940556, weight: 66},
        {latitude:49.477778, longitude:20.03, weight: 9},
        {latitude:49.975, longitude:19.828333, weight: 11},
        {latitude:50.357778, longitude:20.0325, weight: 33},
        {latitude:50.0125, longitude:20.988333, weight: 76},
        {latitude:50.067959, longitude:19.91266, weight: 63},
        {latitude:49.418588, longitude:20.323788, weight: 52},
        {latitude:49.62113, longitude:20.710777, weight: 88},
        {latitude:50.039167, longitude:19.220833, weight: 1},
        {latitude:49.970495, longitude:19.837214, weight: 78},
        {latitude:49.701667, longitude:20.425556, weight: 1},
        {latitude:50.078429, longitude:20.050861, weight: 1},
        {latitude:49.895, longitude:21.054167, weight: 1},
        {latitude:50.27722, longitude:19.569658, weight: 65},
        {latitude:49.968889, longitude:20.606389, weight: 1},
        {latitude:49.51232, longitude:19.63755, weight: 1},
        {latitude:50.018077, longitude:20.989849, weight: 35},
        {latitude:50.081698, longitude:19.895629, weight: 22},
        {latitude:49.968889, longitude:20.43, weight: 54},
        {latitude:50.279167, longitude:19.559722, weight: 1},
        {latitude:50.067947, longitude:19.912865, weight: 69},
        {latitude:49.654444, longitude:21.159167, weight: 1},
        {latitude:50.099606, longitude:20.016707, weight: 80},
        {latitude:50.357778, longitude:20.0325, weight: 99},
        {latitude:49.296628, longitude:19.959694, weight: 1},
        {latitude:50.019014, longitude:21.002474, weight: 46},
        {latitude:50.056829, longitude:19.926414, weight: 22},
        {latitude:49.616667, longitude:20.7, weight: 1},
        {latitude:49.883333, longitude:19.5, weight: 33},
        {latitude:50.054217, longitude:19.943289, weight: 1},
        {latitude:50.133333, longitude:19.4, weight: 100}
      ];
      // console.log(typeof(points[0].longitude));
      return (
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={findCoordinates()}>
              <Text style={styles.welcome}>Find My Coords?</Text>
              <Text>Location: {location}</Text>
          </TouchableOpacity> */}
          {loadHeatmap?<MapView style={styles.mapStyle} initialRegion={{
            latitude: -6.399103,
            longitude: 106.813332,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
            showCompass: true
          }}>
            <Heatmap points={heatmap}
                         opacity={1}
                         onZoomRadiusChange={{
                             zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                             radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                          }}
                          gradient={{
                            colors: ['rgb(42, 7, 168)', 'rgb(224, 0, 176)'],
                            startPoints: [0.2, 1],
                            colorMapSize: 1040, 
                          }}
                         maxIntensity={100}
                         gradientSmoothing={10}
                         heatmapMode={"POINTS_WEIGHT"}/>
            
            <Marker coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
              // latitude: -6.399103,
              // longitude: 106.813332,
            }}
            title={'My Location'}
            icon={()=><FontAwesome5 name="calendar" size={24} color="#CDCCCE" />}
            />
          </MapView>:<Text style={{fontSize: 12, color: 'black', width: '85%', textAlign: 'left'}}>B</Text>}
          
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    borderRadius: 90,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    marginHorizontal: 18,
    marginVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

const map = {
  region: {
    latitude: 50.329,
    longitude: 18.060,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  }
}

const currentLocation = {
  
}