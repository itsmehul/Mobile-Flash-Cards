import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from "react-native";
import { purple, white } from "../utils/colors";

class Quiz extends Component {
  state = {
    showAns: false
  };

  toggleShowAns = () => {
    this.setState({ showAns: !this.state.showAns });
  };

  render() {
    if (this.state.showAns === true) {
      return (
        <TouchableHighlight
          onPress={() => this.toggleShowAns()}
          underlayColor="white"
        >
          <View>
            <Text>TouchableHighlight</Text>
            <View>
              <TouchableOpacity
                style={{ backgroundColor: "black" }}
                onPress={() => this.props.giveAnswer("wrong")}
              >
                <Text style={{ color: "white" }}>Forgot</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "black" }}
                onPress={() => this.props.giveAnswer("right")}
              >
                <Text style={{ color: "white" }}>Remembered</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        onPress={() => this.toggleShowAns()}
        underlayColor="white"
      >
        <View>
          <Text>Question</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Quiz;
