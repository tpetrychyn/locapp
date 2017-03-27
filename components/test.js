import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export class Test extends Component {
    static navigationOptions = {
        header: ({navigate}) => ({
          style: styles.header,
          left: (
              <TouchableHighlight onPress={()=>navigate('DrawerOpen')} underlayColor='rgba(255,255,255,0.1)' style={{left: 10}}>
                  <View>
                      <Icon name='ios-menu' size={30} style={{color: '#4b6878'}} ></Icon>
                  </View>
              </TouchableHighlight>
          ),
          title: 'Test'
      })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Test Page</Text>
                <Button title="View Profile" onPress={() => navigate('ThirdView')}></Button>
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