export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QS = 'ADD_QS'
export const SUBMIT_ANS = 'SUBMIT_ANS'

export function recieveDecks (decks) {
    return{
        type: RECIEVE_DECKS,
        decks
    }
}

export function addDeck (deck) {
    return{
        type: ADD_DECK,
        deck,
    }
}

export function addQs (qs) {
    return{
        type: ADD_QS,
        qs
    }
}

export function submitAns (ans) {
    return{
        type: SUBMIT_ANS,
        ans
    }
}

