import React from 'react';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, TouchableOpacity ,Button,Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config/firebase'
import * as Facebook from 'expo-facebook';

export default class LoginFacebook extends React.Component {
    constructor(){
        super()
        this.state={
            data:false
        }
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
        var that = this
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                that.props.navigation.navigate("Home",{userData:user.providerData,uid:user.uid})
            } 
            else{
            } 
       
        })
    }
    async loginWithFacebook() {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('533361410814228');
            if (type === 'success' && token) {
                var credential = await firebase.auth.FacebookAuthProvider.credential(token);
                await firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((result) => {
                        firebase.firestore().collection("userData").doc(result.user.displayName).set({name:result.user.displayName,img:result.user.photoURL,uid:result.user.uid})
                    })
                    .catch((err) => {
                        console.log('Error==>', err)
                    })

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        
        return (
            <View style={styles.container}>
            <Image
                style={{ width: 100, height: 100 }}
                source={require('./../img/messenger.png')}
            />
            <View style={{ marginTop: '10%' }}>
                <Icon.Button
                    name="facebook"
                    backgroundColor="#3b5998"

                    onPress={() => this.loginWithFacebook()}
                >
                    Login with Facebook
            </Icon.Button>
            </View>


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