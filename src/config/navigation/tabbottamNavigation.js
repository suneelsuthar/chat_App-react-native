import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Messages from './../../screen/messages';
import Peoples from './../../screen/peoples';
import Discover from './../../screen/discover'
import Icon from 'react-native-vector-icons/AntDesign';
import Compass from 'react-native-vector-icons/SimpleLineIcons';

const tabnavigator = createBottomTabNavigator({

    Messages: {
        screen: Messages,
        navigationOptions: {
          title:"messages",
          
          tabBarIcon: ({ tintColor }) => (
            <Icon name="message1" size={25} color="grey" />
            
          )
        },
      
    },
    Peoples: {
        screen: Peoples,
        
        navigationOptions: {
            title:"peoples",
            activeTintColor: 'blue',
            tabBarIcon: ({ tintColor }) => (
              
              <Icon name="user" size={25} color="grey" />
            )
          },
         
          tabBarOptions: {
            activeTintColor: '#ffffff',
            
      },
    },
 
    Discover: {
        screen: Discover,
        navigationOptions: {
            title:"discover",
            activeTintColor: 'blue',
            tabBarIcon: ({ tintColor }) => (
              <Compass name="compass" size={25} color="grey" />
            )
          },
  
    },
   

})

const Tabnavigator = createAppContainer(tabnavigator)
export default Tabnavigator;