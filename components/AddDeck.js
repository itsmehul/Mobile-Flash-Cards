import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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
    const { gotoDeck, add} = this.props;
    const { decks } = this.props;
    const lastItemNumber = parseInt(Object.keys(decks).pop())
    const dkey = isNaN(lastItemNumber)?1:lastItemNumber+1

    deck = {
      quizlist: {},
      name: this.state.deckName
    };

    add(deck, dkey)

    addDeckToStorage(deck, dkey)
      .then(d => {
        //Make sure we parse the json object
      })
      .then(() => this.setState(() => ({ ready: true })));

      gotoDeck({dkey});
  };

  

  render() {
    const { ready } = this.state;
    
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#6699cc",
    alignContent:"center",
    justifyContent:"center"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  card: {
    height: 100,
    margin: 10,
    padding: 20,
    backgroundColor: "#ccd9ff",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0
  },
  cardText: {
    fontSize: 50,
    color: "#33334d"
  }
});

function mapStateToProps(decks) {

  return {
    decks,

  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    gotoDeck: (dkey) => navigation.navigate('Deck',dkey),
    add : (deck,dkey)=>dispatch(addDeck(deck,dkey))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
