import React, { Component } from "react";
import { View, Text,  StyleSheet, } from "react-native";
import Quiz from "./Quiz";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { addDeckToStorage } from "../utils/api";
import TextButton from "./TextButton";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";


class QuizList extends Component {
  state = {
    score: 0,
    total: this.props.quizlength,
    remaining:this.props.quizlength,
    qid:1,
    showAns: false,
    showCompleteView:false,
  };

  toggleShowAns = () => {
    this.setState({ showAns: !this.state.showAns });
  };

  reset = () => {
    this.setState({
      qid:1,
      score:0,
      showAns: false,
      showCompleteView:false,
    })
  }

  nextQs = (ans) => {
    const { deckData, dkey, goBack, add } = this.props;
    const qkey = this.state.qid;
    const count = parseInt(deckData.quizlist[qkey][`${ans}`])

    const newRemaining = this.state.remaining-1
    this.setState({remaining:newRemaining})

    if(ans==="correct"){
      const newScore = this.state.score+1
      this.setState({score:newScore})
    }
    deck = {
      quizlist: {
        ...deckData.quizlist,
        [qkey]: {
          ...deckData.quizlist[qkey],
          [ans]:count+1
        }
      },
      name: deckData.name
    };

    add(deck, dkey);
    addDeckToStorage(deck, dkey)
      .then(() => this.setState(() => ({ ready: true })));
    
    const nextqid = this.state.qid+1
    if(typeof(deckData.quizlist[nextqid])!=="undefined"){
      this.setState({qid:nextqid})
    }else{
      this.setState({showCompleteView:!this.state.showCompleteView})
      clearLocalNotification()
      .then(setLocalNotification)
    }
    this.setState({ showAns: !this.state.showAns });

  }

  render() {
    if(this.props.quizlength!=0){
    return (
      <View style={styles.container}>
        <Text style={{fontSize:17}}>{this.state.remaining!=0?`Remaining questions: ${this.state.remaining}`:'Completed'}</Text>

        {this.state.showCompleteView===false&&(
        <Quiz showAns={this.state.showAns} toggleShowAns={this.toggleShowAns} nextQs={this.nextQs} qid={this.state.qid} dkey={this.props.dkey}/>)}
        {this.state.showCompleteView===true&&(
          <View style={[styles.card,{backgroundColor:'#f0f0f5'}]}>
        <Text style={{fontSize:40, fontWeight:'bold'}}>{`Your score is: ${((this.state.score*100)/this.state.total).toFixed(2)}%`}</Text>
            <TextButton onPress={this.reset}>Reset</TextButton>
          </View>
        )}
      </View>
    );}else{
      return(
        <View style={styles.container}><Text style={{fontSize:20}}>There are no cards on the deck</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf2f9",
    alignItems:"center"
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: "#ccd9ff",
  },
  cardText: {
    fontSize: 50,
    color: "#33334d"
  },
  quizLengthText:{
    fontSize: 28, marginRight: 10, alignSelf: "flex-start"
  }
});

function mapStateToProps(state, { navigation }) {
  const { dkey } = navigation.state.params;
  return {
    dkey,
    state,
    deckData: state[dkey],
    quizlength: Object.keys(state[dkey].quizlist).length
  };
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    add: (deck, dkey) => dispatch(addDeck(deck, dkey))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizList);
