import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Home from './../../screen/home';
import Login from './../../screen/loginfacebook'
import Profile from './../../screen/profile';
import Peoples from './../../screen/peoples';
import Discover from './../../screen/discover'
// import Message from './../../Screens'
import Tabnavigator from './tabbottamNavigation'
const mynavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    Home: {
        screen: Tabnavigator,
        navigationOptions:{
            header:null
        }
    },


    Profile: {
        screen: Profile,
    },
   

})

const Stacknavigator = createAppContainer(mynavigator)
export default Stacknavigator;