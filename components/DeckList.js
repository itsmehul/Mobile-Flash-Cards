import React, { Component } from "react";
import { View, Text, TouchableHighlight, } from "react-native";
//Imports for redux
import { connect } from "react-redux";
import { recieveDecks } from "../actions";
//******************** */
import { fetchDecks } from "../utils/api";
import { AppLoading } from "expo";

function DeckCards({ navigation, deckData }) {
  const length = Object.keys(deckData[1].quizlist).length
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Deck',{
        deckName:deckData[1].name,
        dkey:deckData[0],
        navigation: navigation,
      })}
      underlayColor="white"
    >
      <View>
        <Text>{deckData[1].name}</Text>
        <Text>{length}</Text>
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

    //Call fetchDecks from our Storage api
    fetchDecks()
      //Call action creator to inform our Redux store
      .then(decks => {
        //Make sure we parse the json objec
        dispatch(recieveDecks(JSON.parse(decks)));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  // shouldComponentUpdate(nextprops){
  //   return false}

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View>
        <Text>DeckList View</Text>
        {Object.entries(decks).map(d => {
          return(
          <DeckCards
            navigation={this.props.navigation}
            key={'a'+d[0]}
            deckData={d}
          />
        )})}
      </View>
    );
  }
}
//Get data from redux
function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(DeckList);
