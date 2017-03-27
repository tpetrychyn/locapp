import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export class Profile extends Component {
    static navigationOptions = {
        header: ({navigate}) => ({
          style: styles.header
      })
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Profile Page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
        backgroundColor: 'white'
    },
});