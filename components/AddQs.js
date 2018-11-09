import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { addDeckToStorage } from "../utils/api";

class AddQs extends Component {
  state = {
    qs: "",
    ans: ""
  };

  addQs = () => {
    const { deckData, dkey, goBack, add } = this.props;
    const qkey = parseInt(Object.keys(deckData.quizlist).pop()) + 1;
    deck = {
      quizlist: {
        ...deckData.quizlist,
        [qkey]: {
          remembered: 0,
          forgotten: 0,
          qs: this.state.qs,
          ans: this.state.ans
        }
      },
      name: this.state.deckName
    };
    console.log(deck);

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
      <View>
        <Text>AddQs View</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={qs => this.setState({ qs })}
          value={this.state.qs}
          placeholder={"Why did the chicken cross the road?"}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={ans => this.setState({ ans })}
          value={this.state.ans}
          placeholder={"To get to the other side"}
        />

        <TextButton onPress={() => this.addQs()}>Add Question</TextButton>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { dkey } = navigation.state.params;
  console.log(dkey);

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
