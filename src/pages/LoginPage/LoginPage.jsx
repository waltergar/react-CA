import React, { Component } from 'react'

import Aux from 'components/Hoc/Aux/Aux'
import Login from 'containers/Login/Login'
import NavBar from 'containers/Navbar/Navbar'
// import Footer from 'containers/Footer/Footer'

class HomePage extends Component {
  getAroundLinterWantingPureFuncPage = () => true

  render() {
    return (
      <Aux>
        <NavBar />
        <Login />
        {/* <Footer /> */}
      </Aux>
    )
  }
}

export default HomePage
