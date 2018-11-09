import {
  RECIEVE_DECKS,
  ADD_DECK,
  ADD_QS,
  SUBMIT_ANS,
  DELETE_DECK
} from "../actions/index";

function decks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
    console.log(action.deck)
      return {
        ...state,
        [action.key]:action.deck
      };
    // case SUBMIT_ANS:
    //     return{
    //         ...state,
    //         ...action.decks
    //     }
    // case ADD_QS:
    //     return{
    //         ...state,
    //         ...action.decks
    //     }
    case DELETE_DECK:
      const newDeck = Object.entries({ ...state }).filter(d => d[0] != action.key);
      return {
        ...newDeck.reduce(function(prev, curr) { prev[curr[0]] = curr[1]; return prev; }, {})
      };
    default:
      return state;
  }
}

export default decks;
