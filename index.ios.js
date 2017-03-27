/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Button
} from 'react-native'

//import * as firebase from "firebase"

import { Home, Test, Profile } from './components';

import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator
} from 'react-navigation';


const Stack = {
	FirstView: {
		screen: Home
	},
	SecondView: {
		screen: Test
	},
	ThirdView: {
		screen: Profile
	}
};

const DrawerRoutes = {
	FirstViewStack: {
		name: 'FirstViewStack',
		screen: StackNavigator(Stack, { initialRouteName: 'FirstView'})
	},
	SecondViewStack: {
		name: 'SecondViewStack',
		screen: StackNavigator(Stack, { initialRouteName: 'SecondView'})
	},
};

const RootNavigator =
	StackNavigator({
		Drawer: {
			name: 'Drawer',
			screen: DrawerNavigator(
				DrawerRoutes,
			),
		},
		...Stack
	},
  {
    headerMode: 'none'
  }
);

export default class locapp extends Component {
  constructor() {
    super();
    /*firebase.initializeApp({
      apiKey: "AIzaSyDe1ELmrBy85M9tK6jzMMCxrmVgxoE5Yl0",
      authDomain: "locationapp-12f4a.firebaseapp.com",
      databaseURL: "https://locationapp-12f4a.firebaseio.com",
      storageBucket: "locationapp-12f4a.appspot.com",
      messagingSenderId: "342674853619"
    })*/

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      latitude: '',
      longitude: '',
    }

  }

 /* _writeLocation() {
    const { latitude, longitude } = this.state;
    firebase.database().ref('locations').set({
      location: {
        latitude,
        longitude
      }
    })
  }*/

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { longitude, latitude } = position.coords;
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition, longitude, latitude});
      //this._writeLocation();
    });
    this.routes = ['home', 'test'];
  }

  setRoute(name) {
    navigator.push(name);
  }
  
  routePop() {
    navigator.pop();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <MainNav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('locapp', () => RootNavigator);
