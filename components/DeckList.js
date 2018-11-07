import React, { Component } from "react";
import { View, Text } from "react-native";
//Imports for redux
import { connect } from "react-redux";
import { recieveDecks } from "../actions";
//******************** */
import { fetchDecks } from '../utils/api'
import { AppLoading} from 'expo'
import Deck from "./Deck";


class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount () {
    const { dispatch } = this.props

    //Call fetchDecks from our Storage api
    fetchDecks()
      //Call action creator to inform our Redux store
      .then((decks) => {
          //Make sure we parse the json object 
        dispatch(recieveDecks(JSON.parse(decks)))})
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const {decks} = this.props
    const { ready } = this.state

    if (ready === false) {
        return <AppLoading />
      }

    return (
      <View>
        <Text>DeckList View</Text>
        {Object.values(decks).map(deck=><Deck key={Math.random()*10} deckData={deck}/>)}
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
