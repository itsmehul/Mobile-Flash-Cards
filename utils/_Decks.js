import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks'

function setDummyData () {
  let dummyData = {
      1:{
        quizlist: {
            1:{
              remembered: 2,
              forgotten: 3,
              qs: "ABC1",
              ans: "XYZ1"
            },
            2:{
              remembered: 2,
              forgotten: 3,
              qs: "ABC2",
              ans: "XYZ2"
            }
          },
        name: 'deck 1'
      },
      2:{
        quizlist: {
            1:{
              remembered: 2,
              forgotten: 3,
              qs: "LMN1",
              ans: "XYZ1"
            },
            2:{
              remembered: 2,
              forgotten: 3,
              qs: "LMN2",
              ans: "XYZ2"
            }
          },
        name: 'deck 2'
      },
  }

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export function getDummyData (results) {
  return results === null
    ? setDummyData()
    : results
}