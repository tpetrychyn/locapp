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

import { Home, Test, Profile } from './components';

import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator
} from 'react-navigation';

const TestRoutes = StackNavigator({
  Test: { screen: Test },
  Profile: { screen: Profile},
});

const Tabs = {
  Home: { screen: Home },
  Test: { screen: TestRoutes },
  Profile: { screen: Profile },
}
const RootNavigator =
	TabNavigator({
		...Tabs
	}, 
  {
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
      },
    }
  }
);

AppRegistry.registerComponent('locapp', () => RootNavigator);
