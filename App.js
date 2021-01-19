import React, { Component } from 'react';
import { /*StyleSheet*/ Text, View,Image } from 'react-native';
import {createAppContainer,createSwitchNavigator}from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProfileScreen from './Screens/ProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import EntryScreen from './Screens/EntryScreen';
import LoginScreen from './Screens/loginScreen';
import SignUpScreeen from './Screens/signUpScreen';
import FriendScreen from './Screens/Friends';
import ActivityScreen from './Screens/Activities';
import EventScreen from './Screens/CreateEventScreen';
import Information from './Screens/Info';
import ChatScreen from './Screens/Chat';
import PasswordScreen from './Screens/NewPassScreen';
import FriendRequest from './Screens/FriendRequestScreen';
import SentRequests from './Screens/SentRequests';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import SettingScreen from './Screens/SettingScreen';
import UpdateProfile from './Screens/ProfileUpdate';
import { AppStackNavigator } from './components/AppStackNavigator';
import SplashScreen from './Screens/SplashScreen';
import AppTabNavigator from './components/AppTabNavigator';
import Animation from './Screens/animation';
import MapScreen from './Screens/MapPage';


export default class App extends React.Component {
  render(){
  return (
<AppContainer/>
  );
  }
}

const TabNavigator = createBottomTabNavigator({
    Home:{screen:HomeScreen},
    Friends:{screen:FriendScreen},
    Activities:{screen:AppStackNavigator},
    Chat:{screen:ChatScreen},
    Profile:{screen:ProfileScreen},
  },
  {defaultNavigationOptions:({navigation})=>({    
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName;
      if(routeName === 'Home'){
        return(
          <Image source={require('./assets/Home2.png')}
          style={{width:20,height:20}}/>
        )
      }
      else if(routeName === 'Profile'){
        return( 
          <Image source={require('./assets/profileImg2.png')}
          style={{width:20,height:20}}/>
        )
      }
      else if(routeName === 'Friends'){
        return( 
          <Image source={require('./assets/friends2.png')}
          style={{width:20,height:20}}/>
        )
      }
      else if(routeName === 'Activities'){
        return( 
          <Image source={require('./assets/Activity2.png')}
          style={{width:20,height:20}}/>
        )
      }
      else if(routeName === 'Chat'){
        return( 
          <Image source={require('./assets/Chat2.png')}
          style={{width:20,height:20}}/>
        )
      }
    },
  })
  },{background}
  )

  const SwitchNavigator = createSwitchNavigator({
    SplashScreen:{screen:SplashScreen},
    Slider:{screen:Animation},
    EntryScreen:{screen:EntryScreen},
    TabNavigator:{screen:TabNavigator},
    LoginScreen:{screen:LoginScreen},
    SignUpScreen:{screen:SignUpScreeen},
    CreateEvent:{screen:EventScreen},
    Info:{screen:Information},
    PasswordScreen:{screen:PasswordScreen},
    FriendRequest:{screen:FriendRequest},
    SentRequests:{screen:SentRequests},
    Drawer:{screen:AppDrawerNavigator},
    Setting:{screen:SettingScreen},
    UpdateProfile:{screen:UpdateProfile},
    MapPage:{screen:MapScreen},
  })
const AppContainer = createAppContainer(SwitchNavigator);



