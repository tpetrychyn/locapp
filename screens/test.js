import React, { Component } from 'react'
import {
    View,
    Button,
    Text,
    TouchableHighlight,
    StyleSheet,
    ListView,
    Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export class Test extends Component {
    static navigationOptions = {
        title: 'Test',
        tabBar: {
            icon: ({ tintColor }) => (
                <Icon
                name="star"
                size={24}
                color={tintColor}
                />
            ),
        }
       /* header: ({navigate}) => ({
          style: styles.header,
          title: 'Test'
      })*/
    }
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        }
    }
    rowPress() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }
    renderRow(data) {
        return (
            <View>
                <Text>{data}</Text>
                <Button title='Click me' onPress={this.rowPress} />
            </View>
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Test Page</Text>
                <Button title="View Profile" onPress={() => navigate('Profile')}></Button>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
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