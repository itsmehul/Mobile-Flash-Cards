import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { addDeckToStorage } from "../utils/api";
import { addDeck } from "../actions";
import { AppLoading } from "expo";

class AddDeck extends Component {
  state = {
    deckName: ""
  };

  addDeckHandler = () => {
    const { goBack, add} = this.props;
    const { decks } = this.props;
    console.log(decks)
    const dkey = parseInt(Object.keys(decks).pop())+1

    deck = {
      quizlist: {},
      name: this.state.deckName
    };

    // console.log(deck)
    add(deck, dkey)

    addDeckToStorage(deck, dkey)
      .then(d => {
        //Make sure we parse the json object
      })
      .then(() => this.setState(() => ({ ready: true })));

      goBack();
  };

  

  render() {
    const { ready } = this.state;
    
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View>
        <Text>AddDeck View</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={deckName => this.setState({ deckName })}
          value={this.state.deckName}
          placeholder={"My First Deck"}
        />

        <TextButton onPress={() => this.addDeckHandler()}>Add Deck</TextButton>
      </View>
    );
  }
}

function mapStateToProps(decks) {

  return {
    decks,

  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    add : (deck,dkey)=>dispatch(addDeck(deck,dkey))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
