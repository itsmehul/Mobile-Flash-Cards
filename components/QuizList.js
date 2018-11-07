import React, { Component } from "react";
import { View, Text,  Alert, } from "react-native";
import Quiz from "./Quiz";

class QuizList extends Component {
  state = {
    score: 0,
    total: 0
  };

  componentDidMount(){
      //set total max value
  }

  giveAnswer = answer => {
    Alert.alert(answer);
    //SPREAD STATE
    //UPDATE STATE
    //COMMIT STATE
    //INCREMENT SCORE
  };

  render() {
    return (
      <View>
        <Text>QuizList View</Text>
        {/* List of Qs 
                <Quiz isFlipped={}/>
                */}
        <Quiz giveAnswer={this.giveAnswer}/>
      </View>
    );
  }
}

export default QuizList;
