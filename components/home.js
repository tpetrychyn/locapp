import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export class Home extends Component {
    static navigationOptions = {
        header: ({navigate}) => ({
          style: styles.header,
          left: (
              <TouchableHighlight onPress={()=>navigate('DrawerOpen')} underlayColor='rgba(255,255,255,0.1)' style={{marginLeft: 10}}>
                  <View>
                      <Icon name='ios-menu' size={40} style={{color: '#4b6878'}} ></Icon>
                  </View>
              </TouchableHighlight>
          )
      })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('DrawerOpen')} >
                    <Text>Hello!</Text>
                    </TouchableHighlight>
                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>
                    <Text style={styles.instructions}>
                        {this.props.longitude} - {this.props.latitude}
                    </Text>
                    <Text style={styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                    </Text>
                </View>
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