import {RECIEVE_DECKS, ADD_DECK, ADD_QS, SUBMIT_ANS} from '../actions/index'

function decks(state={}, action){
    switch(action.type){
        case RECIEVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        // case ADD_DECK:
        //     return{
        //         ...state,
        //         ...action.deck
        //     }
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
        default:
            return state
    }
}

export default decks