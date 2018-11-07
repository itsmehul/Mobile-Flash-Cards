import React, { Component } from 'react';
import {View, Text} from 'react-native'
import TextButton from './TextButton';

class Deck extends Component {
    state = {  }

    addQs = () => {
        alert('heeyss')
    }

    startQuiz = () => {

    }

    deleteDeck = () => {

    }

    render() {
        return (
            <View>
                <Text style={{marginBottom:20, alignSelf:"flex-start", justifyContent:"flex-start"}}>{this.props.deckData.name}</Text>
                <TextButton onPress={this.startQuiz}>Start Quiz</TextButton>
                <TextButton onPress={this.addQs}>Add Question</TextButton>
                <TextButton onPress={this.deleteDeck}>Delete Deck</TextButton>
            </View>
        );
    }
}

export default Deck;