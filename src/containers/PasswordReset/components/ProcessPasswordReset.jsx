import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import Textbox from 'components/Core/Textbox/Textbox'
import Button from 'components/Core/Button/Button'
import { Row, Col } from 'components/Core/Section/Section'

import lockIcon from 'assets/images/dashboard/lockIcon.svg'
import arrowRight from 'assets/images/global/arrow-right.svg'
import styles from '../PasswordReset.scss'


class ProcessPasswordReset extends Component {
  state = {
    password: '',
    verifiedPassword: '',
  }

  handleSetPassword = password => this.setState(ps => ({ ...ps, password }))
  handleSetVerifiedPassword = verifiedPassword => this.setState(ps => ({ ...ps, verifiedPassword }))

  render() {
    const { password, verifiedPassword } = this.state
    const { loading, onSubmit } = this.props

    const minPasswordLength = 8
    const disabled = loading
      || (password !== verifiedPassword)
      || (password.length === 0 && verifiedPassword.length === 0)
      || (password.length < minPasswordLength && verifiedPassword.length < minPasswordLength)

    const errorMessage = verifiedPassword.length !== 0 && password !== verifiedPassword ? 'Your passwords don\'t match' : null
    const passwordValidator = [{ minLength: minPasswordLength, error: { level: 3, message: 'Your password must be at least 8 characters long!' } }]

    return (
      <Aux>
        <Row>
          <Col md='2' />
          <Col md='8'>
            <h1 className={styles.header}>Password Reset</h1>
            <p>
              You are only a step away from re-accessing your account,
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
              onClick={() => onSubmit(this.state.password)}
              disabled={disabled}
              icon={arrowRight}
              text='Reset Password'
              primary
            />
          </div>
        </Row>
      </Aux>
    )
  }
}

ProcessPasswordReset.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


export default ProcessPasswordReset
