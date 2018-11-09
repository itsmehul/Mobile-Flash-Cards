import React, { Component } from "react";
import { View, Text,  Alert, } from "react-native";
import Quiz from "./Quiz";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { addDeckToStorage } from "../utils/api";
import TextButton from "./TextButton";


class QuizList extends Component {
  state = {
    score: 0,
    total: this.props.quizlength,
    qid:1,
    showAns: false,
    showCompleteView:false,
  };

  componentDidMount(){
      //set total max value
  }

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
      .then(d => {
        //Make sure we parse the json objec
      })
      .then(() => this.setState(() => ({ ready: true })));
    
    const nextqid = this.state.qid+1
    if(typeof(deckData.quizlist[nextqid])!=="undefined"){
      this.setState({qid:nextqid})
    }else{
      this.setState({showCompleteView:!this.state.showCompleteView})
    }
    this.setState({ showAns: !this.state.showAns });

  }

  render() {
    if(this.props.quizlength!=0){
    return (
      <View>
        <Text>{`${this.state.score}/${this.state.total}`}</Text>

        {this.state.showCompleteView===false&&(
        <Quiz showAns={this.state.showAns} toggleShowAns={this.toggleShowAns} nextQs={this.nextQs} qid={this.state.qid} dkey={this.props.dkey}/>)}
        {this.state.showCompleteView===true&&(
          <View>
            <Text>Completed</Text>
            <TextButton onPress={this.reset}>Reset</TextButton>
          </View>
        )}
      </View>
    );}else{
      return(
        <Text>There are no cards on the deck</Text>
      )
    }
  }
}
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
