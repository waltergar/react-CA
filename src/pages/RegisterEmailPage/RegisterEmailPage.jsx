import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import qs from 'qs'

import connector from 'store/currentUser/connector'
import { authService, oauthService } from 'utils/api/oauth'
import { log } from 'utils/log'

import Aux from 'components/Hoc/Aux/Aux'
import Section, { Row } from 'components/Core/Section/Section'
import NavBar from 'containers/Navbar/Navbar'
import styles from 'containers/Login/Login.scss'

/* eslint-disable react/prop-types */
class RegisterEmailPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    const { token } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    log.debug(token, this.props)
    authService.processEmailConfirmation({ token })
      .then(this.handleRegisterSuccess)
      .catch(error => log.error(error))
  }

  handleRegisterSuccess = ({ data: { oauth, role } }) => {
    oauthService.handleClearSessionStorage()
    setTimeout(() => {
      oauthService.handleSetSessionStorage(oauth)
      this.setState(ps => ({ ...ps, loading: false }))
      this.props.storeRole(role)
      this.props.handleIsAuthenticated(true)
    }, 500)
  }

  render() {
    const { loading } = this.state
    const { isAuthenticated } = this.props

    if (!loading && isAuthenticated) return (<Redirect to='/dashboard' />)

    return (
      <Aux>
        <NavBar />
        <Section className={styles.Login} background='#5d6b81'>
          <Row><h1 className={styles.header}>Thank you for registering!</h1></Row>
          <Row>
            <p className={styles.header}>
              We will now redirect you to your dashboard.
            </p>
          </Row>
        </Section>
      </Aux>
    )
  }
}

export default connector(RegisterEmailPage)
