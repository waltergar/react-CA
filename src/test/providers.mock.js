import React from 'react'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { defaultState as currentUser } from 'store/currentUser/reducers'
import { defaultState as globals } from 'store/globals/reducers'
import { defaultState as cards } from 'store/cards/reducers'


export const getMockReduxStore = () => (
  configureStore()({
    currentUser,
    globals,
    cards,
  })
)


export const MockReduxProvider = props => (
  <Provider store={getMockReduxStore()}>
    {props.children}
  </Provider>
)

MockReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
