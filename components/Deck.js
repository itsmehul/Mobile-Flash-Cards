import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  shouldComponentUpdate(nextProps) {
    if(typeof(nextProps.state[this.props.dkey])!="undefined"){
    if(Object.keys(nextProps.state[this.props.dkey].quizlist).length&&typeof(nextProps.deckData)!="undefined"){return true}
  }
    
    return false;
  }

  render() {
    const { navigation, deckData, dkey } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardText}>{deckData.name}</Text>
            <Text style={styles.quizLengthText}>
              {Object.keys(deckData.quizlist).length}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:"row", alignItems:"flex-end", justifyContent:'center', paddingBottom:20}}>
            <TextButton
              onPress={() => navigation.navigate("QuizList", { dkey })}
              style={[styles.buttonStyle,{backgroundColor:'#009999', color:'#003333', marginRight:20}]}
            >
              Start    Quiz
            </TextButton>
            <TextButton
              onPress={() => {
                navigation.navigate("AddQs", { dkey });
              }}
              style={[styles.buttonStyle,{backgroundColor:'#29293d', color:'#e0e0eb'}]}

            >
              Add Question
            </TextButton>
          </View>
        </View>
        <TextButton style={{color:'#ff4d4d', fontStyle:'italic'}} onPress={this.deleteDeck}>Delete Deck</TextButton>
      </View>
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
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  card: {
    height: 250,
    margin: 10,
    backgroundColor: "#ccd9ff"
  },
  cardText: {
    fontSize: 50,
    color: "#33334d",
    marginLeft:20,
    marginTop:20,
  },
  quizLengthText: {
    fontSize: 28,
    marginRight: 30,
    marginTop:20,
  },
  buttonStyle:{
      padding:10,
      borderRadius:7,
      width:150,
      height: 100
  }
});

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
