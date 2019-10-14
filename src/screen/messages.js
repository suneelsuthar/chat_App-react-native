import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Card, Badge, Icon } from 'native-base';
import Iconstatus from 'react-native-vector-icons/Entypo';
import Logouticon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from './../config/firebase'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';

class Messages extends React.Component {

    state = {
        array: []
    }
    componentDidMount() {
        firebase.firestore().collection('userData').get().then(
            value => {
                value.forEach(doc => {
                    let getuser = doc.data()
                    this.setState({ users: this.state.array.push(getuser) })
                })
            })
    }

  logout(){
      alert("sdfsdfsd")
        firebase.auth().signOut().then(func=()=> {
            this.props.navigation.navigate("Login")
            alert("logout successfully")
          }).catch(function(error) {
          });
    }

    render() {
        let totalUser = this.state.array
        return (
            <SafeAreaView>
                <Card style={{ margin: 0, marginTop: 30, padding: 10, flexDirection: 'row' }}>
                    <Image source={require("../img/active.png")} style={{ marginBottom: -20, marginRight: -10 }} />
                    <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: this.props.navigation.state.params.userData[0].photoURL }} />
                    <Text style={{ marginTop: 15, fontSize: 20, marginLeft: 20 }}>{this.props.navigation.state.params.userData[0].displayName}</Text>


                    <Right>  
                        <ModalDropdown onSelect={()=>this.logout()} options={[' Logout ']} dropdownStyle={{width:100,height:40,marginTop:-10,padding:5,alignItems:'center',fontSize:15}}>
                            <Logouticon name={"dots-vertical"} size={30} />
                        </ModalDropdown>
                    </Right>
                </Card>
                <ScrollView>
                    <View>
                        <View>

                            {/* active user */}
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <ScrollView horizontal={true}>
                                    {totalUser.map((val, i) =>
                                        <View key={i} style={{ width: 100 }}>
                                            <Left>
                                                <Thumbnail source={{ uri: val.img }} />
                                                <Text>{val.name}</Text>
                                            </Left>

                                        </View>
                                    )}

                                </ScrollView>
                            </View>

                            {/* allusers */}
                            <View>
                                {totalUser.map((val, i) =>
                                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate("Profile", { userData: val, currentUser: this.props.navigation.state.params.uid, currentUserImg: this.props.navigation.state.params.userData[0].photoURL })}>
                                        <List>
                                            <ListItem avatar>
                                                <Left>
                                                    <Thumbnail source={{ uri: val.img }} />
                                                </Left>
                                                <Body>
                                                    <Text>{val.name}</Text>
                                                    <Text note style={{ marginTop: 10 }}>write something. .</Text>
                                                </Body>
                                                <Right>
                                                    <Text note>3:43 pm</Text>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </TouchableOpacity>
                                )}


                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        )
    }
}
export default Messages