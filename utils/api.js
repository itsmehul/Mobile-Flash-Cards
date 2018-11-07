import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, getDummyData } from './_Decks'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  //If results is null we use dummy data else we return existing data
  .then(getDummyData)
}

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(DECK_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
//     })
// }