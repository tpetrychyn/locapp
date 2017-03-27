import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'

export class Profile extends Component {
    static navigationOptions = {
        header: ({navigate}) => ({
          style: styles.header
      })
    }
    state = {
        isDateTimePickerVisible: false,
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Profile Page</Text>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text>Show TimePicker</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
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