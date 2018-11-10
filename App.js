import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Easing,
  Animated
} from "react-native";
import AddQs from "./components/AddQs";
import AddDeck from "./components/AddDeck";
import QuizList from "./components/QuizList";
import Deck from "./components/Deck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DeckList from "./components/DeckList";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "react-navigation";
import { Constants } from "expo";
import { setLocalNotification } from "./utils/helpers";

//.Component to leave required space to accomodate for status bar
function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
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
        ),
        tabBarColor:'black'
      }
    }
  },
  {
    initialRouteName: "DeckList",
    activeTintColor: "white",
    shifting: true,
    barStyle: {
      backgroundColor: "#33334d"
    }
  }
);

//Main navigator component having tab navigator
const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    AddQs: {
      screen: AddQs
    },
    QuizList: {
      screen: QuizList
    },
    Deck: {
      screen: Deck
    }
  },
  {
    headerMode: "float",
    mode: "card",
    headerLayoutPreset:'center',
    navigationOptions: {
      gesturesEnabled: false,
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#33334d",
        paddingBottom: 20
      }
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(5)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateX }] };
      }
    })
  }
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MyStatusBar backgroundColor="#33334d" barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf2f9"
  }
});
