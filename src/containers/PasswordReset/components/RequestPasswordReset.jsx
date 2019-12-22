import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import FormGroup from 'components/Core/FormGroup/FormGroup'
import { Row, Col } from 'components/Core/Section/Section'
import { validators } from 'utils/formatters/validators'

import mailIcon from 'assets/images/homepage/mail.svg'
import arrowRight from 'assets/images/global/arrow-right.svg'
import styles from '../PasswordReset.scss'


class RequestPasswordReset extends Component {
  state = {
    emailAddress: null,
    formIsValid: false,
  }

  handleEmailAddressChange = emailAddress => this.setState(ps => ({ ...ps, emailAddress }))
  handleIsValid = formIsValid => this.setState(ps => ({ ...ps, formIsValid }))

  inputs = [{
    id: 'email',
    placeholder: 'Email',
    value: this.state.emailAddress,
    icon: mailIcon,
    handler: this.handleEmailAddressChange,
    validators: validators.globals.email,
  }]

  renderPasswordResetRequestForm = () => {
    const { loading, onSubmit } = this.props
    const isDisabled = loading || !this.state.formIsValid

    return (
      <Aux>
        <Row><h1 className={styles.header}>Password Reset</h1></Row>
        <Row>
          <Col sm='12' md='8' lg='8'>
            <p>Enter the email address linked to your account!</p>
            <FormGroup
              className={styles.formGroup}
              inputs={this.inputs}
              isValid={this.handleIsValid}
            />
          </Col>
        </Row>
        <Row>
          <Button
            onClick={() => onSubmit(this.state.emailAddress)}
            disabled={isDisabled}
            icon={arrowRight}
            text='Reset My Password'
            primary
          />
        </Row>
      </Aux>
    )
  }

  renderSuccessMessage = () => (
    <Aux>
      <Row><h1 className={styles.header}>Reset password email sent!</h1></Row>
      <Row>
        <p className={styles.header}>
          To reset your password, you must click the link sent to your email address.
        </p>
      </Row>
    </Aux>
  )

  render() {
    const { emailSent } = this.props
    if (emailSent) return this.renderSuccessMessage()
    return this.renderPasswordResetRequestForm()
  }
}

RequestPasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  emailSent: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}


export default RequestPasswordReset
