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
    if(this.state.showAns===true){
    return (
      <TouchableHighlight
        onPress={()=>this.toggleShowAns()}
        underlayColor="white"
      >
        <View>
          <Text>TouchableHighlight</Text>
          <View>
            <TouchableOpacity style={{backgroundColor:'black'}} onPress={() => this.props.giveAnswer("wrong")}>
              <Text style={{color: 'white'}}>Forgot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'black'}} onPress={() => this.props.giveAnswer("right")}>
              <Text style={{color: 'white'}}>Remembered</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );}
    return(
        <TouchableHighlight
        onPress={()=>this.toggleShowAns()}
        underlayColor="white"
      >
    <View>
        <Text>Question</Text>
    </View>
    </TouchableHighlight>
    )
    // {
    //   this.state.showAns === false && (
    //     <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableHighlight</Text>
    //         <TouchableOpacity
    //           style={
    //             Platform.OS === "ios"
    //               ? styles.iosSubmitBtn
    //               : styles.AndroidSubmitBtn
    //           }
    //           onPress={this.props.giveAnswer("wrong")}
    //         >
    //           <Text style={styles.submitBtnText}>Incorrect</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={
    //             Platform.OS === "ios"
    //               ? styles.iosSubmitBtn
    //               : styles.AndroidSubmitBtn
    //           }
    //           onPress={this.props.giveAnswer("right")}
    //         >
    //           <Text style={styles.submitBtnText}>Knew it!</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </TouchableHighlight>
    //   );
    // }
    // {this.state.showAns===true&&(
    //   <View style={styles.button}>
    //     <Text style={styles.buttonText}>Answer</Text>
    //   </View>
    // );}
  }
}

export default Quiz;
