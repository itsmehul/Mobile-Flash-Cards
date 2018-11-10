import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { addDeckToStorage } from "../utils/api";
import MyTextInput from "./MyTextInput";

class AddQs extends Component {

  state = {
    qs: "",
    ans: ""
  };

  static navigationOptions = () => {
    return {
      title: `Create Quiz Card`
    };
  };

  addQs = () => {
    const { deckData, dkey, goBack, add } = this.props;
    const lastItemNumber = parseInt(Object.keys(deckData.quizlist).pop())
    const qkey = isNaN(lastItemNumber)?1:lastItemNumber+1
    
    deck = {
      quizlist: {
        ...deckData.quizlist,
        [qkey]: {
          correct: 0,
          incorrect: 0,
          qs: this.state.qs,
          ans: this.state.ans
        }
      },
      name: deckData.name
    };

    add(deck, dkey);
    addDeckToStorage(deck, dkey)
      .then(d => {
        //Make sure we parse the json objec
      })
      .then(() => this.setState(() => ({ ready: true })));
    goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <MyTextInput
          style={{marginBottom:20}}
          onChangeText={qs => this.setState({ qs })}
          value={this.state.qs}
          placeholder={"Question"}
        />
        <MyTextInput
          onChangeText={ans => this.setState({ ans })}
          value={this.state.ans}
          placeholder={"Answer"}
        />

        <TextButton onPress={() => this.addQs()}>Add</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    alignContent: "center",
    justifyContent: "flex-start"
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

function mapStateToProps(state, { navigation }) {
  const { dkey } = navigation.state.params;
  return {
    dkey,
    state,
    deckData: state[dkey]
  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    add: (deck, dkey) => dispatch(addDeck(deck, dkey))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQs);
