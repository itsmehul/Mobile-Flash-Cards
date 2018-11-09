import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import AddQs from "./components/AddQs";
import AddDeck from "./components/AddDeck";
import QuizList from "./components/QuizList";
import Deck from "./components/Deck"
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DeckList from "./components/DeckList";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "react-navigation";
import { Constants } from 'expo'

//.Component to leave required space to accomodate for status bar
function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

//Tab navigator component
const Tabs = createMaterialBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "DeckList",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-list" size={24} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-add" size={24} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: "DeckList",
    activeTintColor: "white",
    shifting: true
  }
);

//Main navigator component having tab navigator
const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions:{
        header: null
      }
    },
    AddQs: {
      screen: AddQs
    },
    QuizList: {
      screen: QuizList
    },
    Deck:{
      screen: Deck,
    }
  },
  {
    headerMode: "float",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
        paddingBottom:20
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
        {/* Render the status bar along with the Main navigator */}
        <MyStatusBar backgroundColor='blue' barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
