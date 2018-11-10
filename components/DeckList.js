import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { recieveDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { AppLoading } from "expo";

function DeckCards({ navigation, deckData }) {
  const length = Object.keys(deckData[1].quizlist).length;
  return (
    <TouchableHighlight
      style={styles.card}
      onPress={() => {
        navigation.navigate("Deck", {
          deckName: deckData[1].name,
          dkey: deckData[0],
          navigation: navigation
        });
      }}
      underlayColor="white"
    >
      <View style={styles.row}>
        <Text style={styles.cardText}>{deckData[1].name}</Text>
        <Text
          style={styles.quizLengthText}
        >
          {length}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => {
        dispatch(recieveDecks(JSON.parse(decks)));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <ScrollView style={styles.container}>
        {Object.entries(decks).map(d => {
          return (
            <DeckCards
              navigation={this.props.navigation}
              key={"a" + d[0]}
              deckData={d}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf2f9"
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
  },
  cardText: {
    fontSize: 50,
    color: "#33334d"
  },
  quizLengthText:{
    fontSize: 28, marginRight: 10, alignSelf: "flex-start"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(DeckList);
