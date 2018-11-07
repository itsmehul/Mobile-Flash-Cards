import React, { Component } from 'react';
import {View, Text, TextInput} from 'react-native'
import TextButton from './TextButton';

class AddQs extends Component {
    state = {
        qs: '',
        ans: ''
      }

    addQs = () => {
        alert('Qs Added')
        //SAVE TO DB
    }

    render() {
        return (
            <View>
                <Text>AddQs View</Text>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(qs) => this.setState({qs})}
                value={this.state.qs}
                placeholder={'Why did the chicken cross the road?'}
                />
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(ans) => this.setState({ans})}
                value={this.state.ans}
                placeholder={'To get to the other side'}
                />

                <TextButton onPress={this.addQs}>Add Question</TextButton>
            </View>
        );
    }
}

export default AddQs;