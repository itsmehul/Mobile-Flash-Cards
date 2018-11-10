import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
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
        <View style={styles.card}>
          <Text style={{fontSize:20}}>{ans}</Text>
          <View style={{flexDirection:"row",flex:1, justifyContent:"space-between", alignItems:"flex-end"}}>
            <TextButton
              onPress={() => this.props.nextQs("incorrect")}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#009999",
                  color: "#003333",
                  marginRight: 20
                }
              ]}
            >
              Incorrect
            </TextButton>
            <TextButton
              onPress={() => this.props.nextQs("correct")}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#009999",
                  color: "#003333",
                }
              ]}
            >
              Correct
            </TextButton>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.card}>
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              fontStyle: "italic",
              fontSize: 30
            }}
          >
            {qs}
          </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf2f9",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  card: {
    alignItems:"stretch",
    margin: 10,
    padding: 20,
    backgroundColor: "#ccd9ff",
    marginBottom:50
  },
  cardText: {
    fontSize: 50,
    color: "#33334d"
  },
  quizLengthText: {
    fontSize: 28,
    marginRight: 10,
    alignSelf: "flex-start"
  },
  buttonStyle:{
    padding:10,
    borderRadius:7,
    width:140,
    height: 100
}
});

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
