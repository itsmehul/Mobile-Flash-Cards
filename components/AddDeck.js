import React, { Component } from 'react';
import {View, Text, TextInput} from 'react-native'
import TextButton from './TextButton';

class AddDeck extends Component {
    state = {
        deckName: '',
      }

    addDeck = () => {
        alert('Qs Added')
    }

    render() {
        return (
            <View>
                <Text>AddDeck View</Text>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(deckName) => this.setState({deckName})}
                value={this.state.deckName}
                placeholder={'My First Deck'}
                />

                <TextButton onPress={this.addDeck}>Add Deck</TextButton>
            </View>
        );
    }
}

export default AddDeck;