import React, { Component } from 'react';
import { View, Alert,Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';


export default class App extends Component {
  
  async showFirstContactAsync() {
      // Ask for permission to query contacts.
      const permission = await Permissions.askAsync(Permissions.CONTACTS);
      
      if (permission.status !== 'granted') {
        // Permission was denied...
        return;
      }
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });
      
      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
    }
    
  render() {
    return (
      <View style={{flex: 1, paddingTop: 40}}>
        <Button title='Get contacts' onPress={this.showFirstContactAsync} />
      </View>
    );
  }
}