import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import qs from 'qs'

import connector from 'store/currentUser/connector'
import ProcessPasswordReset from 'containers/PasswordReset/components/ProcessPasswordReset'
import RequestPasswordReset from 'containers/PasswordReset/components/RequestPasswordReset'
import Section, { Row } from 'components/Core/Section/Section'
import Loading from 'components/Core/Loading/Loading'
import Footer from 'containers/Footer/Footer'

import { authService, oauthService } from 'utils/api/oauth'
import { log } from 'utils/log'
import styles from './PasswordReset.scss'


class PasswordReset extends Component {
  state = {
    token: null,
    passwordResetEmailSent: false,
    loading: false,
    error: null,
  }

  componentDidMount = () => {
    const { location } = this.props
    const { token } = qs.parse(location && location.search, { ignoreQueryPrefix: true }) || null
    if (token) this.setState(ps => ({ ...ps, token }))
  }

  handleSetError = error => this.setState(ps => ({ ...ps, error }))
  toggleLoader = toggle => this.setState(ps => ({ ...ps, loading: toggle }))

  // Reset Password Section
  handlePasswordResetSubmit = (password) => {
    const { token } = this.state
    const payload = { token, password }

    this.toggleLoader(true)

    authService
      .processPasswordResetConfirmation(payload)
      .then(this.handlePasswordResetSuccess)
      .catch(this.handlePasswordResetError)
  }

  handlePasswordResetSuccess = (response) => {
    log.debug({ fn: 'handlePasswordResetSuccess', response })
    const { data: { oauth, role } } = response

    oauthService.handleClearSessionStorage()
    setTimeout(() => {
      oauthService.handleSetSessionStorage(oauth)
      this.toggleLoader(false)
      this.props.storeRole(role)
      this.props.handleIsAuthenticated(true)
    }, 500)
  }

  handlePasswordResetError = (error) => {
    log.error({ fn: 'ProcessPasswordReset.handleRegisterFailure', error })

    let errorMessage = 'There seems to have been an error. Please navigate to this page using the link you received in your email, and try again.'
    if (error && error.status === 400) errorMessage = 'It seems like you have an invalid link. Please navigate to this page using the link you received in your email, and try again.'

    this.toggleLoader(false)
    this.handleSetError(errorMessage)
  }

  // Retrieve Password Reset Link Section
  handleRetrievePasswordResetLinkSubmit = (email) => {
    const payload = { email, username: email }

    this.toggleLoader(true)
    authService
      .retrievePasswordResetLink(payload)
      .then(this.handleRetrievePasswordResetLinkSuccess)
      .catch(this.handleRetrievePasswordResetLinkError)
  }

  handleRetrievePasswordResetLinkSuccess = (response) => {
    log.debug({ fn: 'handleRetrievePasswordResetLinkSuccess', response })
    this.setState(
      ps => ({ ...ps, passwordResetEmailSent: true }),
      this.toggleLoader(false),
    )
  }

  handleRetrievePasswordResetLinkError = (error) => {
    if (error) {
      log.error({ fn: 'handleRetrievePasswordResetLinkError', error })
      let errorMessage = 'There was an error, please try again.'
      if (error.response.status === 400) errorMessage = 'There was an error with the email address you provided, please try again.'
      if (error.response.status === 403) errorMessage = 'This account was not activated, please activate your account with the information provided to you by email.'
      if (error.response.status === 404) errorMessage = 'Check your inbox! If there is an account associated with this email, you’ll receive password reset instructions.'

      this.setState(
        ps => ({ ...ps, error: errorMessage }),
        this.toggleLoader(false),
      )
    }
  }

  render() {
    const { isAuthenticated } = this.props
    const {
      loading,
      passwordResetEmailSent,
      token,
      error,
    } = this.state
    if (!loading && isAuthenticated) return (<Redirect to='/dashboard' />)

    return (
      <div>
        <Section className={styles.SignUp} background='#5d6b81'>
          { !token && (
            <RequestPasswordReset
              onSubmit={this.handleRetrievePasswordResetLinkSubmit}
              emailSent={passwordResetEmailSent}
              loading={loading}
            />
          )}
          { token && (
            <ProcessPasswordReset
              onSubmit={this.handlePasswordResetSubmit}
              loading={loading}
            />
          )}
          { error && <Row><p className={styles.message}>{error}</p></Row> }
          {loading && (<Loading />)}
        </Section>
        <Footer />
      </div>
    )
  }
}

PasswordReset.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  storeRole: PropTypes.func.isRequired,
  handleIsAuthenticated: PropTypes.func.isRequired,
}


export default connector(PasswordReset)
