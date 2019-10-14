import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import *  as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

import {Button} from 'react-native'

export default class App extends React.Component {
    constructor(){
        super()
        this.state={
            location:null
        }
    }
        async componentDidMount(){
            let status  = await Permissions.askAsync(Permissions.LOCATION);
            console.log("status",status)
            if (status.status !== 'granted') {
             alert(" permission not Granted")
            }
        
        }
   
        getLoc = async () => {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
        } 

  render() {
      console.log(this.state)
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} />
        <Button title="get location" onPress={this.getLoc} />
      </View>
    );
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
