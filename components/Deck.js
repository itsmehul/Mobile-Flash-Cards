import React, { Component } from "react";
import { View, Text } from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { deleteDeck } from "../actions";
import { removeDeckFromStorage } from "../utils/api";

class Deck extends Component {
  state = {};

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckName
    };
  };
  
  deleteDeck = () => {
    const { remove, goBack, dkey } = this.props;
    remove();
    removeDeckFromStorage(dkey);
    goBack();
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { navigation, deckData, dkey } = this.props;
    return (
      <View>
        <Text style={{ marginBottom: 20, alignSelf: "flex-start", justifyContent: "flex-start" }} >
          {deckData.name}
        </Text>
        <Text style={{ marginBottom: 20, alignSelf: "flex-start", justifyContent: "flex-start" }} >
          {Object.keys(deckData.quizlist).length}
        </Text>
        <TextButton onPress={() => navigation.navigate("QuizList",{dkey})}>
          Start Quiz
        </TextButton>
        <TextButton onPress={() => { navigation.navigate("AddQs",{dkey}); }} >
          Add Question
        </TextButton>
        <TextButton onPress={this.deleteDeck}>Delete Deck</TextButton>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { dkey } = navigation.state.params;
  return {
    dkey,
    deckData: state[dkey],
    state
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const dkey = navigation.state.params.dkey;
  return {
    remove: () => dispatch(deleteDeck(dkey)),
    goBack: () => navigation.goBack(),
    add: (deck, dkey) => dispatch(addDeck(deck, dkey))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
