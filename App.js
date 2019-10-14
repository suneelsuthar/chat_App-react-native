import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Stacknavigaion from './src/config/navigation/stacknavigation'
import {Provider} from 'react-redux' 
import store from './src/config/store/index'
import LoginFacebook from './src/screen/loginfacebook'
import Map from './src/screen/map'
export default class App extends React.Component {
 state = {
   value:false,
   picker:false,
 }
  render(){
  return (
    // <Provider store={store}>
  //  <Stacknavigaion />
  //  </Provider>
  <Map />
   
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
});
