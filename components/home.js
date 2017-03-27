import React, { Component } from 'react'
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps';

import {
    View,
    Button,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

export class Home extends Component {
    constructor() {
        super()
        firebase.initializeApp({
            apiKey: "AIzaSyDe1ELmrBy85M9tK6jzMMCxrmVgxoE5Yl0",
            authDomain: "locationapp-12f4a.firebaseapp.com",
            databaseURL: "https://locationapp-12f4a.firebaseio.com",
            storageBucket: "locationapp-12f4a.appspot.com",
            messagingSenderId: "342674853619"
        })

        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            latitude: 37.78825,
            longitude: -122.4324,
        }
    }

    watchID: ?number = null;

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { longitude, latitude } = position.coords;
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition, longitude, latitude});
            this.writeLocation();
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    writeLocation() {
        const { latitude, longitude } = this.state;
        firebase.database().ref('locations').set({
            location: {
                latitude,
                longitude
            }
        })
    }

    render() {
        const { latitude, longitude } = this.state;
        const latLong = {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        return (
            <View style={styles.container}>
                <MapView
                    style={{...StyleSheet.absoluteFillObject}}
                    region={latLong}
                >
                    <MapView.Marker
                        coordinate={latLong}
                        title='Hey'
                    />
                </MapView>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
        backgroundColor: 'white'
    },
});