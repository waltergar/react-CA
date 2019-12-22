import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { Redirect } from 'react-router-dom'

import connector from 'store/currentUser/connector'
import { oauthService } from 'utils/api/oauth'
import { accountService as childAccountService } from 'utils/api/child'
import { log } from 'utils/log'

import Aux from 'components/Hoc/Aux/Aux'
import Textbox from 'components/Core/Textbox/Textbox'
import Button from 'components/Core/Button/Button'
import Section, { Row, Col } from 'components/Core/Section/Section'
import Footer from 'containers/Footer/Footer'
import NavBar from 'containers/Navbar/Navbar'
import lockIcon from 'assets/images/dashboard/lockIcon.svg'
import arrowRight from 'assets/images/global/arrow-right.svg'
import styles from './RegisterChildPage.scss'


class RegisterChildPage extends Component {
  state = {
    loading: false,
    password: '',
    verifiedPassword: '',
    error: null,
  }

  handleRegisterChild = () => {
    const { token } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const payload = { token, password: this.state.password }

    log.debug({ fn: 'RegisterChildPage.handleRegisterChild', payload })
    childAccountService.registerChild(payload)
      .then(this.handleRegisterSuccess)
      .catch(this.handleRegisterFailure)
  }

  handleRegisterSuccess = ({ data: { oauth } }) => {
    oauthService.handleClearSessionStorage()
    setTimeout(() => {
      oauthService.handleSetSessionStorage(oauth)
      this.setState(ps => ({ ...ps, loading: false }))
      this.props.storeRole('child')
      this.props.handleIsAuthenticated(true)
    }, 500)
  }

  handleRegisterFailure = (error) => {
    const { response } = error
    log.error({ fn: 'RegisterChildPage.handleRegisterFailure', error })
    if (response && response.status === 400) {
      this.setState(ps => ({ ...ps, error: 'It seems like you have an invalid link. Please navigate to this page using the link you received in your email, and try again.' }))
    } else {
      this.setState(ps => ({ ...ps, error: 'There seems to have been an error. Please navigate to this page using the link you received in your email, and try again.' }))
    }
  }

  handleSetPassword = password => (
    this.setState(prevState => ({ ...prevState, password }))
  )

  handleSetVerifiedPassword = verifiedPassword => (
    this.setState(prevState => ({ ...prevState, verifiedPassword }))
  )

  render() {
    const { loading, password, verifiedPassword, error } = this.state
    const { isAuthenticated } = this.props

    const minPasswordLength = 8
    const disabled = loading
      || (password !== verifiedPassword)
      || (password.length === 0 && verifiedPassword.length === 0)
      || (password.length < minPasswordLength && verifiedPassword.length < minPasswordLength)

    if (!loading && isAuthenticated) return (<Redirect to='/dashboard' />)

    const errorMessage = verifiedPassword.length !== 0 && password !== verifiedPassword ? 'Your passwords don\'t match' : null
    const passwordValidator = [{ minLength: minPasswordLength, error: { level: 3, message: 'Your password must be at least 8 characters long!' } }]

    if (error) {
      return (
        <Aux>
          <NavBar />
          <Section className={styles.RegisterChild} background='#5d6b81'>
            <Row>
              <Col md='2' />
              <Col md='8'>
                <h1 className={styles.header}>Bummer</h1>
                <p>{error}</p>
              </Col>
              <Col md='2' />
            </Row>
          </Section>
          <Footer />
        </Aux>
      )
    }

    return (
      <Aux>
        <NavBar />
        <Section className={styles.RegisterChild} background='#5d6b81'>
          <Row>
            <Col md='2' />
            <Col md='8'>
              <h1 className={styles.header}>Join Credit Academy</h1>
              <p>
                You are only a step away from accessing your account,
                  please create a password below to login.
              </p>
            </Col>
            <Col md='2' />
          </Row>
          <Row>
            <Col md='2' />
            <Col md='8'>
              <Textbox
                placeholder='Password'
                password
                icon={lockIcon}
                isTransparent
                handleValueChange={this.handleSetPassword}
                validators={passwordValidator}
              />
              {
                password.length > 0 && (<Textbox
                  placeholder='Verify Password'
                  password
                  icon={lockIcon}
                  isTransparent
                  handleValueChange={this.handleSetVerifiedPassword}
                  incomingError={errorMessage}
                />)
              }
            </Col>
            <Col md='2' />
          </Row>
          <Row>
            <div className={styles.buttonContainer}>
              <Button
                onClick={this.handleRegisterChild}
                disabled={disabled}
                icon={arrowRight}
                text='Create Account'
                primary
              />
            </div>
          </Row>
        </Section>
        <Footer />
      </Aux>
    )
  }
}

RegisterChildPage.propTypes = {
  location: PropTypes.object.isRequired,
  storeRole: PropTypes.func.isRequired,
  handleIsAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default connector(RegisterChildPage)
