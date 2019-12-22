import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger'

import { SENTRY_ENV as ENV } from 'utils/constants'
import reducer from './reducers'

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const TEST_ENV = process.env.NODE_ENV === 'test'
const middleware = ENV === 'PROD' || TEST_ENV ? [] : [logger]

export const getReduxStore = () => ({
  store: createStore(
    reducer,
    undefined,
    composeEnhancers(applyMiddleware(...middleware)),
  ),
})

export default getReduxStore
