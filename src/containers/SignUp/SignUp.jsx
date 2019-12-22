import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import qs from 'qs'

import { accountService } from 'utils/api/parent'
import { validators, masks, cleansers } from 'utils/formatters/validators'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import Textbox from 'components/Core/Textbox/Textbox'
import FormGroup from 'components/Core/FormGroup/FormGroup'
import CheckBox from 'components/Core/CheckBox/CheckBox'
import Loading from 'components/Core/Loading/Loading'
import Footer from 'containers/Footer/Footer'

import lockIcon from 'assets/images/dashboard/lockIcon.svg'
import genderIcon from 'assets/images/dashboard/genderIcon.svg'
import userIcon from 'assets/images/dashboard/userIcon.svg'
import phoneIcon from 'assets/images/homepage/phone.svg'
import mailIcon from 'assets/images/homepage/mail.svg'
import arrowRight from 'assets/images/global/arrow-right.svg'
import styles from './SignUp.scss'

// ?ref_code=I7gc9fCMJcV1RgvWwI0MiJSWjFrSg7&email=charlespolanco%40gmail.com
class SignUp extends Component {
  state = {
    // eslint-disable-next-line
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    verifyPassword: '',
    role: '',
    acceptsUserAgreement: false,
    loading: false,
    registrationEmailSent: false,
    formIsValid: false,
    refCode: '',
  }

  componentDidMount = () => {
    // eslint-disable-next-line
    const { location } = this.props

    // eslint-disable-next-line
    const { ref_code, email } = qs.parse(location && location.search, { ignoreQueryPrefix: true }) || null
    if (ref_code) this.setState(ps => ({ ...ps, refCode: ref_code }))
    if (email) this.setState(ps => ({ ...ps, email }))
  }

  handleIsValid = formIsValid => (
    this.setState(ps => ({ ...ps, formIsValid }))
  )

  handleFullNameChange = (fullName) => {
    const names = fullName.split(' ')
    const firstName = names[0]
    const lastName = names.length > 1 && names[1]
    this.setState(prevState => ({ ...prevState, fullName, firstName, lastName }))
  }

  handleEmailChange = email => this.setState(prevState => ({ ...prevState, email }))
  handlePhoneChange = phone => this.setState(prevState => ({ ...prevState, phone }))
  handleAddressChange = address => this.setState(prevState => ({ ...prevState, address }))
  handleRoleChange = role => this.setState(prevState => ({ ...prevState, role }))
  handlePasswordChange = password => this.setState(prevState => ({ ...prevState, password }))
  handleVerifyPasswordChange = verifyPassword => (
    this.setState(prevState => ({ ...prevState, verifyPassword }))
  )

  handleAccountCreationSubmit = () => {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      password,
      role,
      refCode,
      acceptsUserAgreement,
    } = this.state
    const addressInfo = address.split(',')
    const state = addressInfo[2].trim().split(' ')[0]
    const zipcode = addressInfo[2].trim().split(' ')[1]
    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone: cleansers.telephone(phone),
      address: {
        street_address: addressInfo[0],
        city: addressInfo[1].trim(),
        state,
        zipcode,
      },
      parent_role: role,
      accepts_user_agreement: acceptsUserAgreement,
      ref_code: refCode,
    }

    const isValidAddress = zipcode.match(validators.globals.zipCode[0].regex)
        && state.match(validators.globals.state[0].regex)

    if (!isValidAddress) {
      this.setState(prevState => ({ ...prevState, isValidForm: false }))
      return
    }


    this.setState(prevState => ({ ...prevState, loading: true, addressError: '', emailError: '' }))

    accountService
      .createParent(payload)
      .then(this.handleAccountCreationSuccess)
      .catch(this.handleAccountCreationError)
  }

  handleAccountCreationSuccess = () => {
    this.setState(ps => ({ ...ps, loading: false, registrationEmailSent: true }))
  }

  handleAccountCreationError = (error) => {
    const errMsg = error.response.data
    this.setState(ps => ({
      ...ps,
      loading: false,
      emailError: errMsg.value_name === 'email' ? 'Sorry, the email your using is associated with another account. Please try another email. Credit Academy Team' : '',
      addressError: errMsg.value_name === 'address' ? 'Sorry, the address your using is associated with another account. Please try another address. Credit Academy Team' : '',
    }))
  }

  handleChangeSign = (isChecked) => {
    this.setState({
      acceptsUserAgreement: isChecked,
    })
  }

  render() {
    const {
      registrationEmailSent,
      loading,
      password,
      verifyPassword,
      formIsValid,
      role,
      phone,
      address,
      fullName,
      email,
      acceptsUserAgreement,
      addressError,
      emailError,
    } = this.state

    const minPasswordLength = 8
    const passwordValidator = [{ minLength: minPasswordLength, error: { level: 3, message: 'Your password must be at least 8 characters long!' } }]
    const errorMessage = password !== verifyPassword ? 'Your passwords don\'t match!' : null

    const disabled = loading
      || !formIsValid
      || (password !== verifyPassword)
      || (password.length === 0 || verifyPassword.length === 0)
      || (password.length < minPasswordLength || verifyPassword.length < minPasswordLength)
      || role.length !== 3
      || address.split(',').length !== 4
      || !acceptsUserAgreement
      // || !isValidAddress

    if (registrationEmailSent) {
      return (
        <Section className={styles.SignUp} background='#5d6b81'>
          <Row><h1 className={styles.header}>Confirmation email sent!</h1></Row>
          <Row>
            <p className={styles.header}>
              To login, you must click the link in the email used to register.
            </p>
          </Row>
        </Section>
      )
    }

    const inputs = [
      { id: 'fullName', placeholder: 'Your first and last name', value: fullName, icon: userIcon, handler: this.handleFullNameChange, validators: validators.globals.firstLastOnly },
      { id: 'role', type: 'dropdown', placeholder: 'I am Dad / Mom', value: role, icon: genderIcon, handler: this.handleRoleChange, options: [{ id: 'mom', name: 'Mom' }, { id: 'dad', name: 'Dad' }] },
      { id: 'phone', placeholder: 'Mobile', value: phone, icon: phoneIcon, handler: this.handlePhoneChange, mask: masks.telephone, validators: validators.globals.phoneNumber },
      { id: 'address', placeholder: 'Address', value: address, icon: userIcon, handler: this.handleAddressChange, isAddress: true, validators: validators.globals.streetAddress, incomingError: addressError, errorHandler: () => { this.setState({ addressError: '' }) } },
      { id: 'email', placeholder: 'Email', value: email, icon: mailIcon, handler: this.handleEmailChange, validators: validators.globals.email, incomingError: emailError, errorHandler: () => { this.setState({ emailError: '' }) } },
    ]
    const agreement = (
      <span>
        Check this box if you agree to the <NavLink className={styles.link} to='/esign'>E-Sign Disclosure</NavLink>,
        &nbsp;<NavLink className={styles.link} to='/privacy'>Privacy Policy</NavLink> and
        &nbsp;<NavLink className={styles.link} to='/cardholderagreement'>Cardholder Agreement</NavLink>
      </span>
    )

    return (
      <div>
        <Section className={styles.SignUp} background='#5d6b81'>
          <Row><h1 className={styles.header}>Create Account</h1></Row>
          <Row>
            <Col sm='12' md='8' lg='9'>
              <FormGroup inputs={inputs} isValid={this.handleIsValid} />
              <Textbox
                placeholder='Password'
                password
                icon={lockIcon}
                isTransparent
                handleValueChange={this.handlePasswordChange}
                validators={passwordValidator}
              />
              {
                password.length > 0 && (<Textbox
                  placeholder='Verify Password'
                  password
                  icon={lockIcon}
                  isTransparent
                  handleValueChange={this.handleVerifyPasswordChange}
                  incomingError={errorMessage}
                />)
              }
            </Col>
          </Row>
          <Row>
            <CheckBox
              label={agreement}
              className={styles.checkBoxAgreement}
              handleCheckboxChange={this.handleChangeSign}
            />
          </Row>
          <Row>
            <Col sm='12' md='8' lg='9'>
              <p className={classNames(styles.disclaimer, { [styles.bold]: true })}>
                USA PATRIOT Act Disclaimer
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm='12' md='8' lg='9'>
              <p className={styles.disclaimer}>
                {`Important information for opening a card account: To help the federal government
                fight the funding of terrorism and money laundering activities, the USA PATRIOT Act
                requires all financial institutions and their third parties to obtain, verify and
                record information that identifies each person who opens a card account. What this
                means for you: When you open a card account, we will ask for your name, address,
                date of birth, and other information that will allow us to identify you. We may also
                ask to see your driver’s license or other identifying documents.
                `}
              </p>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={this.handleAccountCreationSubmit}
              disabled={disabled}
              icon={arrowRight}
              text='Create Account'
              primary
            />
          </Row>
          {loading && (<Loading />)}
        </Section>
        <Footer />
      </div>
    )
  }
}

export default SignUp
