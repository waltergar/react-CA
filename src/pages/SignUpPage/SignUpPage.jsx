import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import SignUp from 'containers/SignUp/SignUp'
import NavBar from 'containers/Navbar/Navbar'

class SignUpPage extends Component {
  getAroundLinterWantingPureFuncPage = () => true

  render() {
    return (
      <Aux>
        <NavBar />
        <SignUp location={this.props.location} />
      </Aux>
    )
  }
}

SignUpPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SignUpPage
