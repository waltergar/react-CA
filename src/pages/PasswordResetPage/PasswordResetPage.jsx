import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import PasswordReset from 'containers/PasswordReset/PasswordReset'
import NavBar from 'containers/Navbar/Navbar'

class PasswordResetPage extends Component {
  getAroundLinterWantingPureFuncPage = () => true

  render() {
    return (
      <Aux>
        <NavBar />
        <PasswordReset location={this.props.location} />
      </Aux>
    )
  }
}

PasswordResetPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default PasswordResetPage
