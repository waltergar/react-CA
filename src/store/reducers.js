import { persistCombineReducers } from 'redux-persist'
import { persistConfig } from 'store/persist'

import currentUser from 'store/currentUser/reducers'
import globals from 'store/globals/reducers'
import cards from 'store/cards/reducers'
import createCard from 'store/createCard/reducers'

const rootReducer = persistCombineReducers(persistConfig, {
  currentUser,
  globals,
  cards,
  createCard,
})

export default rootReducer
