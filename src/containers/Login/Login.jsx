import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Redirect, NavLink } from 'react-router-dom'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import Textbox from 'components/Core/Textbox/Textbox'
import Loading from 'components/Core/Loading/Loading'
import Footer from 'containers/Footer/Footer'

import connector from 'store/currentUser/connector'
import { oauthService } from 'utils/api/oauth'
import { validators } from 'utils/formatters/validators'
import mail from 'assets/images/homepage/mail.svg'
import lockIcon from 'assets/images/dashboard/lockIcon.svg'
import arrowRight from 'assets/images/global/arrow-right.svg'
import styles from './Login.scss'


class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    loginError: false,
    errMsg: '',
    loginAttempt: 0,
  }

  handleEmailChange = email => this.setState(prevState => ({ ...prevState, email }))
  handlePasswordChange = password => this.setState(prevState => ({ ...prevState, password }))
  handleLoginSubmit = () => {
    const payload = {
      client_id: 'client_id',
      client_secret: 'client_secret',
      username: this.state.email,
      password: this.state.password,
      grant_type: 'password',
    }

    this.setState(prevState => ({ ...prevState, loading: true }))

    oauthService
      .handleLogin(payload)
      .then(this.handleLoginSuccess)
      .catch(this.handleLoginError)
  }

  handleLoginSuccess = ({ data: { oauth, role } }) => {
    this.setState(ps => ({ ...ps, loading: false }))
    oauthService.handleClearSessionStorage()
    setTimeout(() => {
      oauthService.handleSetSessionStorage(oauth)
      this.props.storeRole(role)
      this.props.handleIsAuthenticated(true)
    }, 500)
  }

  handleLoginError = (error) => {
    // Ensure redux not reflecting authenticated, and clear session storage.
    this.setState(ps => ({ ...ps, loading: false }))
    this.props.handleIsAuthenticated(false)
    oauthService.handleClearSessionStorage()
    let errMsg = ''
    // Handle case of bad credentials
    if (error.response.status === 401) {
      errMsg = 'Error logging in, check your username and password!'
    } else if (error.response.status === 403 && error.response.data.status === 'user_inactive') {
      errMsg = 'Please confirm your account via the link we sent you by email. Credit Academy.'
    }
    this.setState(ps => ({
      ...ps,
      loginError: true,
      errMsg,
      loginAttempt: ps.loginAttempt + 1,
    }))
    setTimeout(() => this.setState(ps => ({ ...ps, loginError: false })), 3000)
  }

  render() {
    if (this.props.isAuthenticated === true) return <Redirect to='/dashboard' />
    const {
      email,
      password,
      loading,
      loginError,
      loginAttempt,
      errMsg,
    } = this.state
    const forgotPasswordClassName = classNames(
      styles.formText,
      { [styles.bold]: loginAttempt > 2 },
    )
    const disabled = loading
      || (email.length === 0 || password.length === 0)

    return (
      <div>
        <Section className={styles.Login} background='#5d6b81'>
          <Row><h1 className={styles.header}>Login</h1></Row>
          <Row>
            <Col md='8'>
              <Textbox
                className={styles.emailText}
                placeholder='Email Address'
                icon={mail}
                isTransparent
                handleValueChange={this.handleEmailChange}
                validators={validators.globals.email}
              />
              <Textbox
                placeholder='Password'
                password
                icon={lockIcon}
                isTransparent
                handleValueChange={this.handlePasswordChange}
              />
            </Col>
          </Row>
          <Row>
            <NavLink to='/sign-in/forgot' className={forgotPasswordClassName}>Forgot password?</NavLink>
          </Row>
          <Row>
            <Button
              onClick={this.handleLoginSubmit}
              className={!loginError ? styles.loginButton : ''}
              icon={arrowRight}
              disabled={disabled}
              text='Login'
              primary
            />
          </Row>
          {loading && (<Loading />)}
          {loginError && (
            <Row>
              <p className={styles.formText}>
                {errMsg}
              </p>
            </Row>
          )}
        </Section>
        <Footer />
      </div>
    )
  }
}


Login.propTypes = {
  handleIsAuthenticated: PropTypes.func.isRequired,
  storeRole: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}


export default connector(Login)
