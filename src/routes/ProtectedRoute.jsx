import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import connector from 'store/currentUser/connector'


const ProtectedRoute = props => (
  props.isAuthenticated
    ? <Route {...props} />
    : <Redirect to='/sign-in' />
)

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default connector(ProtectedRoute)
