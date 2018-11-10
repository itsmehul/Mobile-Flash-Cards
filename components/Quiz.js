import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";

class Quiz extends Component {

  render() {
    const { ans, qs } = this.props.state[this.props.dkey].quizlist[
      this.props.qid
    ];
    if (this.props.showAns === true) {
      return (
        <TouchableHighlight
          onPress={() => this.toggleShowAns()}
          underlayColor="white"
        >
          <View>
            <Text>{ans}</Text>
            <View>
              <TouchableOpacity
                style={{ backgroundColor: "black" }}
                onPress={() => this.props.nextQs("incorrect")}
              >
                <Text style={{ color: "white" }}>Incorrect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "black" }}
                onPress={() => this.props.nextQs("correct")}
              >
                <Text style={{ color: "white" }}>Correct</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <View>
        <View>
          <Text>{qs}</Text>
        </View>
        <TextButton
          onPress={() => {
            this.props.toggleShowAns();
          }}
        >
          Show Answer
        </TextButton>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    state
  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack()
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
