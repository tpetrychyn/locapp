import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Home, Top, Test, Profile } from './screens';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

//Add routes here for a nested stack
const TestRoutes = StackNavigator({
  Test: { screen: Test },
  Profile: { screen: Profile},
});

const Tabs = {
  Home: { screen: Home },
  Top: { screen: Top },
  Test: { screen: Test },
  //Test: { screen: TestRoutes } 
}

const RootNavigator = StackNavigator({
  App: { screen: TabNavigator({
      ...Tabs
    }, 
    {
      // Hides stack header on android
      navigationOptions: { header: { visible: false } },
      animationEnabled: true,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#1d2c4d',
        indicatorStyle: {
          //top: 0,
          height: 4,
          backgroundColor: 'black'
        },
        labelStyle: {
          fontSize: 12,
          color: 'black',
          
        },
        style: {
          backgroundColor: 'white',
        },
      }
    }
  )},
  // Add a route here to use the main stack
  Profile: { screen: Profile }
},
{
  // Set to screen so ios can manually hide
  headerMode: 'screen',
});

export default class App extends Component {
  constructor() {
    super();
    firebase.initializeApp({
        apiKey: "AIzaSyDe1ELmrBy85M9tK6jzMMCxrmVgxoE5Yl0",
        authDomain: "locationapp-12f4a.firebaseapp.com",
        databaseURL: "https://locationapp-12f4a.firebaseio.com",
        storageBucket: "locationapp-12f4a.appspot.com",
        messagingSenderId: "342674853619"
    })
  }
  render() {
    return (
      <RootNavigator />
    )
  }
}