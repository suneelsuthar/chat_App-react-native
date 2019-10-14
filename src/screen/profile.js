import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {KeyboardAvoidingView,ScrollView,Card,Image,YellowBox} from 'react-native'
import { View, Text, Left, Right } from 'native-base';
import Iconstatus from 'react-native-vector-icons/Entypo';
import Logouticon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from './../config/firebase'
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class Peoples extends React.Component {
    state = {
        messages: [],
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),

            headerStyle: { height: 70 },


            headerTitle: (

                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: navigation.state.params.img }} />
                    <Text style={{ marginTop: 15, fontSize: 20, marginLeft: 20 }}>{navigation.state.params.name}</Text>
                </View>
            ),



        };
    };


    componentDidMount =async () =>{
        let allmessage =[]
       let currentUser=this.props.navigation.state.params.currentUser
      let sendTouid=this.props.navigation.state.params.userData.uid

      console.log("uid message ==>", currentUser ,sendTouid)
        this.props.navigation.setParams({ 
            name: this.props.navigation.state.params.userData.name, 
            img: this.props.navigation.state.params.userData.img 
        })

       await firebase.firestore().collection(currentUser).where("currentUser","==",sendTouid).get().then(
            value => {
                value.forEach(doc => {
                    let getchat = doc.data()
                    getchat.chat[0]._id=1
                    getchat.chat[0].user._id=2
                    getchat.chat[0].createdAt =getchat.chat[0].createdAt.toDate() 
                    allmessage.push(getchat.chat[0])
                    console.log("send me all message",getchat.chat[0])
                })
        })

       await firebase.firestore().collection(sendTouid).where("currentUser","==",currentUser).get().then(
            value => {
                value.forEach(doc => {
                    let getchat = doc.data()
                    // getchat.chat[0]._id=1
                    // getchat.chat[0].user._id=2
                    getchat.chat[0].createdAt =getchat.chat[0].createdAt.toDate() 
                    allmessage.push(getchat.chat[0])

                })
                
            })

           await console.log("All messgae",allmessage)
           await allmessage.sort(function(a, b){return b.createdAt-a.createdAt});
           await this.setState({messages:allmessage})



        






        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //     ],
        // })
    }

    onSend(messages = []) {
        let chats = GiftedChat.append(this.state.messages, messages)
        firebase.firestore().collection(this.props.navigation.state.params.userData.uid).add({
            username: this.props.navigation.state.params.userData.name,
            currentUser:this.props.navigation.state.params.currentUser,
            sendTouid:this.props.navigation.state.params.userData.uid,
            chat: chats,
        })
      

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        console.log("navigation======2==========>",this.state)
        return (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={90}

                    enabled
                >
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                            name: "sds",
                            avatar: this.props.navigation.state.params.currentUserImg,
                        }}

                    />
                </KeyboardAvoidingView>
        )
    }
}

