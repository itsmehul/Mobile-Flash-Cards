import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "./components/Deck";
import AddQs from "./components/AddQs";
import AddDeck from "./components/AddDeck";
import QuizList from "./components/QuizList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DeckList from "./components/DeckList";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DeckList/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  }
});
