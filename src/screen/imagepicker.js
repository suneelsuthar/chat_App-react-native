import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class About extends React.Component{
  componentDidMount() {
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
   

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render(){
    return(
      <View style={styles.container}>
<Button
          title="Open Image Picker"
          onPress = {this._pickImage}
        />
        
       
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
      margin: 'auto'
    },
  });