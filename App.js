import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './components/Deck';
import AddQs from './components/AddQs';
import AddDeck from './components/AddDeck';
import QuizList from './components/QuizList';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <QuizList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
});
