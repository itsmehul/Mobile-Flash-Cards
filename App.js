import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "./components/Deck";
import AddQs from "./components/AddQs";
import AddDeck from "./components/AddDeck";
import QuizList from "./components/QuizList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DeckList from "./components/DeckList";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from 'react-navigation';

const Tabs = createMaterialBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "DeckList",
        tabBarIcon: ({tintColor}) => <Icon name="ios-list" size={24} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({tintColor}) => <Icon name="ios-add" size={24} color={tintColor} />
      }
    }
  },
  {
    initialRouteName: "DeckList",
    activeTintColor: "white",
    shifting: true
  }
);

const Stack = createStackNavigator({
  DeskList: {
    screen: DeskList
  },
  Deck: {
    screen: Deck
  },
  AddQs:{
    screen: AddQs
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  }
});
