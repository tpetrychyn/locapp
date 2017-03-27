import React, { Component } from 'react'
import * as firebase from 'firebase'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '../constants/google-maps.json'

import {
    View,
    Button,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'

export class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBar: {
            icon: ({ tintColor }) => (
                <Icon
                name="map"
                size={24}
                color={tintColor}
                />
            ),
        }
    }
    constructor() {
        super()
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
        const latLong2 = {
            latitude: latitude+0.005,
            longitude
        }
        return (
            <View style={styles.container}>
                <MapView
                    style={{...StyleSheet.absoluteFillObject}}
                    provider={PROVIDER_GOOGLE}
                    region={latLong}
                    customMapStyle={MapStyle}>
                    <MapView.Marker
                        coordinate={latLong}
                        title='Hey'
                    />
                    <MapView.Circle 
                        center={latLong} 
                        radius={400}
                        strokeWidth={0}
                        fillColor={'rgba(255,0,0,0.5)'} />
                    <MapView.Circle 
                        center={latLong2} 
                        radius={400}
                        strokeWidth={0}
                        fillColor={'rgba(0,255,0,0.4)'} />
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
  }
});