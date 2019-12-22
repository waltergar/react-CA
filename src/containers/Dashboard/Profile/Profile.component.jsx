import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'
import classNames from 'classnames'

import { accountService as parentService, bankAccountService } from 'utils/api/parent'
import { accountService as childService } from 'utils/api/child'
import { oauthService, authService } from 'utils/api/oauth'
import { validators, masks, cleansers } from 'utils/formatters/validators'
import { profileFormatter, fullAddressFormatter } from 'utils/formatters/profile'
import { log } from 'utils/log'

import Aux from 'components/Hoc/Aux/Aux'
import Section, { Row, Col } from 'components/Core/Section/Section'
import Textbox from 'components/Core/Textbox/Textbox'
import Button from 'components/Core/Button/Button'
import InfoModal from 'components/Dashboard/InfoModal/InfoModal'
import LinkPlaiddModal from 'components/Dashboard/LinkPlaid/LinkPlaidModal'
import Loading from 'components/Core/Loading/Loading'

import phoneIcon from 'assets/images/homepage/phone.svg'
import chevronIcon from 'assets/images/dashboard/chevron.svg'
import calendarIcon from 'assets/images/homepage/calendar.svg'
import mailIcon from 'assets/images/homepage/mail.svg'
import userIcon from 'assets/images/homepage/user.svg'
import mapIcon from 'assets/images/dashboard/mapIcon.svg'
import lockIcon from 'assets/images/dashboard/lockIcon.svg'
import trash from 'assets/images/dashboard/trashIcon.svg'

import styles from './Profile.scss'

class Profile extends Component {
  state = {
    fullName: '',
    email: '',
    phone: '',
    fullAddress: '',
    street_address: '',
    city: '',
    state: '',
    zipcode: '',
    dob: null,
    rawProfile: {},
    passwordStars: '•••••••••••••',
    password: '',
    verifiedPassword: '',
    loading: true,
    isEditing: false,
    isPhoneEditing: false,
    isAddressEditing: false,
    isPasswordEditing: false,
    isEmailEditing: false,
    error: false,
    errorMessage: '',
    showMailMessage: false,
    isValid: true,
    isPasswordEqual: false,
    isDirty: false,
    addressActiveField: 0,
    isMobile: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
    this.props.togglePlaidVisibility(false)
    this.toggleLoader(true)
    this.handleGetProfile()
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  initLoad = (data) => {
    this.props.togglePlaidVisibility(false)
    this.props.storeProfile({ ...this.props.currentUser, bank_account: data })
  }

  openPlaid = () => {
    this.props.togglePlaidVisibility(true)
  }

  imageExists = (image_url) => {
    const http = new XMLHttpRequest()
    http.open('HEAD', image_url, false)
    http.send()
    return http.status !== 404
  }

  resize() {
    this.setState(prevState => ({
      ...prevState,
      isMobile: window.innerWidth <= 760,
    }))
  }

  handleDeleteBankAccount = () => (
    this.setState(prevState => ({
      ...prevState,
      loading: true,
      isOpenDelete: false,
      errorMessage: '',
    }), () => {
      bankAccountService
        .deleteAccount()
        .then(this.handleDeleteBankResponse)
        .catch(this.handleDeleteBankError)
    })
  )

  handleDeleteBankResponse = (res) => {
    log.debug({ fn: 'handleDeleteBankResponse', res })
    if (res.status === 200 || res.status === 201) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
      }), () => {
        this.props.deleteBankAccount()
      })
    } else if (res.status === 404) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        error: true,
        errorMessage: 'Hmm, linked bank account not found, if you believe this is a mistake, please contact support.',
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        error: true,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleDeleteBankError = (error) => {
    log.error({ fn: 'handleDeleteBankError', error })

    // Conflicting Account
    if (error.response && error.response.status === 404) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        error: true,
        errorMessage: 'Hmm, linked bank account not found, if you believe this is a mistake, please contact support.',
      }))
    }

    // Catch all for unhappy paths
    if (error.response && error.response.status !== 404) {
      log.error({ fn: 'handleDeleteBankError', error })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        error: true,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleParentProfile = () => {
    parentService
      .getParent()
      .then(this.handleIncomingProfileData)
      .catch(this.handleIncomingProfileError)
  }

  handleChildProfile = () => {
    childService
      .getChild()
      .then(this.handleIncomingProfileData)
      .catch(this.handleIncomingProfileError)
  }

  handleGetProfile = () => {
    const { isChild } = this.props
    if (isChild) {
      this.handleChildProfile()
    } else {
      this.handleParentProfile()
    }
  }

  handleIncomingProfileData = ({ data: rawProfile }) => {
    const {
      fullName,
      email,
      phone,
      fullAddress,
      street_address,
      city,
      state,
      zipcode,
      dob,
    } = profileFormatter.normalizeData(rawProfile)
    this.setState(
      prevState => (
        {
          ...prevState,
          fullName,
          email,
          phone,
          fullAddress,
          street_address,
          city,
          state,
          zipcode,
          dob,
          initProfileData: {
            email,
            phone,
            street_address,
            city,
            state,
            zipcode,
          },
        }),
      () => {
        this.toggleLoader(false)
        log.debug({ fn: 'handleIncomingProfileData', rawData: rawProfile, stateData: this.state })
      },
    )
  }

  handleError = (error) => {
    this.setState(prevState => ({ ...prevState, error: true, errorMessage: 'Oops, something went wrong, please try again later.' }))
    log.error(error)
  }

  toggleLoader = loaderVisibility => (
    this.setState(prevState => ({ ...prevState, loading: loaderVisibility }))
  )

  handleEditPhone = () => {
    const { isEmailEditing, isPasswordEditing, isAddressEditing } = this.state
    if (!isEmailEditing && !isPasswordEditing && !isAddressEditing) {
      this.setState(prevState => ({
        ...prevState,
        isPhoneEditing: true,
      }))
    }
    this.props.toggleHeaderTransparency(true)
  }

  handleEditAddress = () => {
    const { isEmailEditing, isPasswordEditing, isPhoneEditing } = this.state
    if (!isEmailEditing && !isPasswordEditing && !isPhoneEditing) {
      this.setState(prevState => ({
        ...prevState,
        isAddressEditing: true,
        addressActiveField: 0,
      }))
    }
    this.props.toggleHeaderTransparency(true)
  }

  handleAddressActiveField = (addressActiveField) => {
    const { isEmailEditing, isPasswordEditing, isPhoneEditing } = this.state
    if (!isEmailEditing && !isPasswordEditing && !isPhoneEditing) {
      this.setState(prevState => ({
        ...prevState,
        addressActiveField,
      }))
    }
    this.props.toggleHeaderTransparency(true)
  }

  handleEditEmail = () => {
    const { isPhoneEditing, isAddressEditing, isPasswordEditing } = this.state
    if (!isPhoneEditing && !isAddressEditing && !isPasswordEditing) {
      this.setState(prevState => ({
        ...prevState,
        isEmailEditing: true,
      }))
    }
    this.props.toggleHeaderTransparency(true)
  }

  handleEditPassword = () => {
    const { isPhoneEditing, isAddressEditing, isEmailEditing } = this.state
    if (!isPhoneEditing && !isAddressEditing && !isEmailEditing) {
      this.setState(prevState => ({
        ...prevState,
        isPasswordEditing: true,
        isValid: false,
      }))
    }
    this.props.toggleHeaderTransparency(true)
  }

  handleSaveProfileSuccess = () => {
    const address = fullAddressFormatter.normalizeData(this.addressFromState())
    this.setState(prevState => ({
      ...prevState,
      fullAddress: address.fullAddress,
      isEditing: false,
    }))
    this.handleGetProfile()
  }

  handleSavePhoneSuccess = () => {
    this.setState(prevState => ({
      ...prevState,
      isPhoneEditing: false,
    }))
    this.handleGetProfile()
  }

  handleSaveParentAddress = (field) => {
    parentService
      .modifyParentProfile({
        address: field,
      })
      .then(this.handleSaveProfileSuccess)
      .catch(this.handleError)
  }

  handleSaveAddress = (field) => {
    this.handleSaveParentAddress(field)
  }


  handleSaveChildPhone = () => {
    childService
      .modifyChildPhone({
        phone: cleansers.telephone(this.state.phone),
      })
      .then(this.handleSavePhoneSuccess)
      .catch(this.handleError)
  }

  handleSaveParentPhone = () => {
    parentService
      .modifyParentProfile({
        phone: cleansers.telephone(this.state.phone),
      })
      .then(this.handleSavePhoneSuccess)
      .catch(this.handleError)
  }

  handleSavePhone = () => {
    const { isChild } = this.props
    if (isChild) {
      this.handleSaveChildPhone()
    } else {
      this.handleSaveParentPhone()
    }
  }

  handleSaveEmail = () => {
    this.setState(prevState => ({
      ...prevState,
      isEditing: false,
    }))
  }

  handleSavePasswordSuccess = (response) => {
    this.setState(prevState => ({
      ...prevState,
      password: '',
      verifiedPassword: '',
      isPasswordEditing: false,
    }))

    log.debug({ fn: 'handleStorePassword', response })
    const { data: { oauth } } = response

    oauthService.handleClearSessionStorage()
    setTimeout(() => {
      oauthService.handleSetSessionStorage(oauth)
    }, 500)
  }

  handleSavePassword = () => {
    const { password } = this.state
    authService
      .modifyPassword({
        password,
      })
      .then(this.handleSavePasswordSuccess)
      .catch(this.handleError)
  }

  handleSaveEmailSuccess = () => {
    this.setState(prevState => ({
      ...prevState,
      email: this.state.initProfileData.email,
      isEmailEditing: false,
      showMailMessage: true,
    }))
  }

  handleSaveEmail = () => {
    const { isChild } = this.props
    if (isChild) {
      this.handleSaveChildEmail()
    } else {
      this.handleSaveParentEmail()
    }
  }

  handleSaveParentEmail = () => {
    parentService
      .modifyParentEmail({
        email: this.state.email,
      })
      .then(this.handleSaveEmailSuccess)
      .catch(this.handleError)
  }

  handleSaveChildEmail = () => {
    childService
      .modifyChildEmail({
        email: this.state.email,
      })
      .then(this.handleSaveEmailSuccess)
      .catch(this.handleError)
  }

  handleDropEditing = () => {
    this.setState(prevState => ({
      ...prevState,
      errorMessage: '',
      isEmailEditing: false,
      isPasswordEditing: false,
      isPhoneEditing: false,
      isAddressEditing: false,
      addressActiveField: 0,
      isValid: true,
      error: false,
      isDirty: false,
      showMailMessage: false,
      email: this.state.initProfileData.email,
      phone: this.state.initProfileData.phone,
      state: this.state.initProfileData.state,
      city: this.state.initProfileData.city,
      zipcode: this.state.initProfileData.zipcode,
      street_address: this.state.initProfileData.street_address,
    }))
    this.props.toggleHeaderTransparency(false)
  }

  addressFromState = () => (
    {
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
    }
  )

  handleStoreFormChange = (stateKey, value) => (
    this.setState(ps => ({ ...ps, [stateKey]: value, isDirty: true }))
  )

  handlePassword = (password) => {
    const isNotValid =
      this.state.verifiedPassword.length === 0
      || password !== this.state.verifiedPassword
    this.setState(ps => ({ ...ps, password, isDirty: true, isPasswordEqual: !isNotValid }))
  }

  handleVerifiedPassword = (verifiedPassword) => {
    const isNotValid = verifiedPassword.length === 0 || this.state.password !== verifiedPassword
    this.setState(ps => ({ ...ps, verifiedPassword, isDirty: true, isPasswordEqual: !isNotValid }))
  }

  handleCloseInfoWindow = () => {
    this.setState(prevState => ({ ...prevState, showMailMessage: false }))
  }

  handleIsValid = isValid => this.setState(prevState => ({ ...prevState, isValid }))

  profileFullNameView = [
    {
      key: 'fullName',
      placeholder: 'Name',
      disabled: true,
      icon: userIcon,
    },
  ]

  profileDobView = [
    {
      key: 'dob',
      placeholder: 'Date of birth',
      disabled: true,
      icon: calendarIcon,
    },
  ]

  profileEmailView = [
    {
      key: 'email',
      placeholder: 'Email',
      icon: mailIcon,
      onFocus: () => this.handleEditEmail(),
    },
  ]

  profileEmailInputs = [
    {
      key: 'email',
      placeholder: 'Email',
      textboxName: 'Email',
      icon: mailIcon,
      validators: validators.globals.email,
      handler: value => this.handleStoreFormChange('email', value),
      handleIsValid: this.handleIsValid,
      action: () => this.handleSaveEmail(),
      cancelAction: () => this.handleDropEditing(),
    },
  ]

  profilePhoneView = [
    {
      key: 'phone',
      icon: phoneIcon,
      mask: masks.telephone,
      placeholder: 'Mobile',
      onFocus: () => this.handleEditPhone(),
    },
  ]

  profileAddressView = [
    {
      key: 'fullAddress',
      icon: mapIcon,
      placeholder: 'Address',
      onFocus: () => this.handleEditAddress(),
    },
  ]

  profilePasswordView = [
    {
      key: 'passwordStars',
      icon: lockIcon,
      placeholder: 'Password',
      onFocus: () => this.handleEditPassword(),
    },
  ]

  profilePhoneInputs = [
    {
      key: 'phone',
      placeholder: 'Mobile',
      textboxName: 'Mobile',
      icon: phoneIcon,
      validators: validators.globals.phoneNumber,
      mask: masks.telephone,
      handler: value => this.handleStoreFormChange('phone', value),
      handleIsValid: this.handleIsValid,
      action: () => this.handleSavePhone(),
      cancelAction: () => this.handleDropEditing(),
    },
  ]

  profileAddressInputs = [
    {
      key: 'street_address',
      placeholder: 'Address Line',
      icon: mapIcon,
      textboxName: 'Address Line',
      handler: value => this.handleStoreFormChange('street_address', value),
      validators: validators.globals.streetAddress,
      handleIsValid: this.handleIsValid,
      action: () => this.handleSaveParentAddress({ street_address: this.state.street_address }),
      cancelAction: () => this.handleDropEditing(),
      onFocus: () => this.handleAddressActiveField(0),
    },
    {
      key: 'city',
      placeholder: 'City',
      textboxName: 'City',
      icon: mapIcon,
      handler: value => this.handleStoreFormChange('city', value),
      validators: validators.globals.city,
      handleIsValid: this.handleIsValid,
      action: () => this.handleSaveParentAddress({ city: this.state.city }),
      cancelAction: () => this.handleDropEditing(),
      onFocus: () => this.handleAddressActiveField(1),
    },
    {
      key: 'state',
      placeholder: 'State',
      textboxName: 'State',
      icon: mapIcon,
      handler: value => this.handleStoreFormChange('state', value),
      validators: validators.globals.state,
      action: () => this.handleSaveParentAddress({ state: this.state.state }),
      handleIsValid: this.handleIsValid,
      cancelAction: () => this.handleDropEditing(),
      onFocus: () => this.handleAddressActiveField(2),
    },
    {
      key: 'zipcode',
      placeholder: 'Zip code',
      textboxName: 'Zip code',
      icon: mapIcon,
      handler: value => this.handleStoreFormChange('zipcode', value),
      validators: validators.globals.zipCode,
      action: () => this.handleSaveParentAddress({ zipcode: this.state.zipcode }),
      handleIsValid: this.handleIsValid,
      cancelAction: () => this.handleDropEditing(),
      onFocus: () => this.handleAddressActiveField(3),
    },
  ]

  renderInputs = (profileInputs, enabled) => {
    const { isMobile } = this.state
    const isProfile = true
    const inputs = profileInputs.map(input => (
      <React.Fragment>
        <div className={styles.editField} key={`textbox_${input.key}`}>
          <Textbox
            className={styles.textbox}
            value={this.state[input.key]}
            defaultValue={this.state[input.key]}
            placeholder={input.placeholder}
            textboxName={input.textboxName}
            icon={input.icon}
            handleValueChange={input.handler}
            validators={input.validators}
            mask={input.mask}
            key={input.placeholder}
            disabled={input.disabled}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            buttonText='Save'
            buttonAction={input.action}
            buttonIcon={chevronIcon}
            isButtonEnable={enabled}
            isValid={input.handleIsValid}
            iconOnly={isMobile}
            isProfile={isProfile}
          />
          {input.cancelAction &&
            <Button
              className={styles.textBoxCancelButton}
              onClick={input.cancelAction}
              text={isMobile ? 'X' : 'Cancel'}
              key={`button_${input.key}`}
            />
          }
        </div>
      </React.Fragment>
    ))
    return (inputs)
  }

  renderViewInputs = (profileInputs, isEdited) => {
    const inputs = profileInputs.map(input => (
      <button onClick={input.onFocus} className={styles.viewField} key={input.key}>
        { !isEdited &&
          <SvgInline svg={input.icon} className={styles.inputIcon} />
        }
        { input.textboxName &&
          <span
            className={
              classNames(styles.viewFieldTextboxName, {
                [styles.viewFieldTextWithoutIcon]: isEdited,
              })
            }
          >
            {input.textboxName}
          </span>
        }
        <span className={styles.viewFieldText}>
          {this.state[input.key]}
          { input.disabled &&
            <SvgInline
              svg={lockIcon}
              className={classNames(styles.disableIcon, styles.inputIcon)}
            />
          }
        </span>

      </button>
    ))
    return (inputs)
  }

  renderPasswordInputs = () => {
    const minPasswordLength = 8
    const passwordValidator = [{ minLength: minPasswordLength, error: { level: 3, message: 'Your password must be at least 8 characters long!' } }]
    const errorMessage = this.state.verifiedPassword.length !== 0 && this.state.password !== this.state.verifiedPassword ? 'Your passwords don\'t match' : null
    return (
      <React.Fragment>
        <Textbox
          placeholder='Password'
          password
          icon={lockIcon}
          handleValueChange={this.handlePassword}
          validators={passwordValidator}
          incomingError={errorMessage}
          isValid={this.handleIsValid}
        />
        <Textbox
          placeholder='Verify Password'
          password
          icon={lockIcon}
          handleValueChange={this.handleVerifiedPassword}
          incomingError={errorMessage}
        />
      </React.Fragment>
    )
  }

  renderEmail = () => {
    const { isEmailEditing, isValid, isDirty } = this.state
    const enabled = isDirty && isValid
    return (
      <React.Fragment>
        { !isEmailEditing && this.renderViewInputs(this.profileEmailView) }
        { isEmailEditing && this.renderInputs(this.profileEmailInputs, enabled) }
      </React.Fragment>
    )
  }

  renderPhone = () => {
    const { isPhoneEditing, isValid, isDirty } = this.state
    const enabled = isDirty && isValid
    return (
      <React.Fragment>
        { !isPhoneEditing && this.renderViewInputs(this.profilePhoneView) }
        { isPhoneEditing && this.renderInputs(this.profilePhoneInputs, enabled) }
      </React.Fragment>
    )
  }

  renderAddress = () => {
    const { isAddressEditing, isValid, isDirty, addressActiveField } = this.state
    const enabled = isDirty && isValid
    const { isChild } = this.props
    return (
      <React.Fragment>
        { !isChild && !isAddressEditing && this.renderViewInputs(this.profileAddressView) }
        { !isChild &&
          isAddressEditing &&
          addressActiveField < this.profileAddressInputs.length &&
          this.renderViewInputs(
            this.profileAddressInputs.slice(0, addressActiveField),
            isAddressEditing,
          )
        }
        { !isChild &&
          isAddressEditing &&
          this.renderInputs(
            this.profileAddressInputs.slice(addressActiveField, addressActiveField + 1),
            enabled,
          )
        }
        { !isChild &&
          isAddressEditing &&
          addressActiveField < this.profileAddressInputs.length &&
          this.renderViewInputs(
            this.profileAddressInputs.slice(addressActiveField + 1),
            isAddressEditing,
          )
        }
      </React.Fragment>
    )
  }

  renderPhoneAddressButton = () => {
    const { isEditing, isEmailEditing, isValid, isDirty } = this.state
    const enabled = isDirty && isValid
    return (
      <React.Fragment>
        { isEditing &&
          !isEmailEditing &&
          <React.Fragment>
            <Button
              className={styles.saveButton}
              onClick={this.handleSaveProfile}
              disabled={!enabled}
            >
              Save
            </Button>
            <Button
              className={styles.cancelButton}
              onClick={this.handleDropEditing}
            >
              Cancel
            </Button>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

  renderPassword = () => {
    const { isEditing, isPasswordEditing } = this.state

    return (
      <React.Fragment>
        { !isPasswordEditing && !isEditing && this.renderViewInputs(this.profilePasswordView) }
        { isPasswordEditing && this.renderPasswordInputs() }
      </React.Fragment>
    )
  }

  renderPasswordButton = () => {
    const {
      isEditing,
      isEmailEditing,
      isPasswordEditing,
      isValid,
      isDirty,
      isPasswordEqual,
    } = this.state
    const enabled = isDirty && isValid && isPasswordEqual

    return (
      <React.Fragment>
        { isPasswordEditing &&
          !isEditing &&
          !isEmailEditing &&
          <React.Fragment>
            <Button
              className={styles.saveButton}
              onClick={this.handleSavePassword}
              disabled={!enabled}
            >
              Save
            </Button>
            <Button
              className={styles.cancelButton}
              onClick={this.handleDropEditing}
            >
              Cancel
            </Button>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

  render() {
    const {
      loading,
      isEmailEditing,
      isPasswordEditing,
      isPhoneEditing,
      isAddressEditing,
      error,
      errorMessage,
      showMailMessage,
    } = this.state
    const { isChild, isRegistered, bankAccount, hasLinkedBankAccount } = this.props

    const isFormEditing = isPhoneEditing || isAddressEditing || isEmailEditing || isPasswordEditing
    if (loading) return <Loading />

    const emailMessage = 'Confirmation link was sent to your current email.'
    const institution_id = bankAccount && bankAccount.institution_id ? bankAccount.institution_id : ''
    const logoUrl = this.imageExists(`/images/bank/${institution_id}.png`) ? `/images/bank/${institution_id}.png` : '/images/bank/bank.jpeg'
    return (
      <Aux>
        <Section className={
          classNames(styles.DashboardHeader, { [styles.editing]: isFormEditing })}
        >
          <h1>My Profile</h1>
          <p>You can edit the details by clicking on them</p>
          {error && <p>{errorMessage}</p>}
        </Section>
        { !isChild && isRegistered &&
          <Section className={styles.fundingSource}>
            <Row className={styles.fundingSourceContainer}>
              <div className={styles.headerWrapper}>
                <div className={styles.headerText}>Funding Source</div>
                { !hasLinkedBankAccount &&
                  <Button
                    className={styles.newCardButton}
                    text='ADD FUNDING SOURCE'
                    onClick={() => this.openPlaid()}
                    disabled={hasLinkedBankAccount}
                    small
                  />
                }
              </div>
              { hasLinkedBankAccount &&
                <div className={styles.fundingSourceWrapper}>
                  <div className={styles.fundingSourceItem}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={logoUrl} alt='bank logo' style={{ width: 40, marginRight: 20 }} />
                      <div className={styles.fundingDetail}>
                        <div className={styles.accountName}>{bankAccount.name}</div>
                        <div className={styles.bankInfo}>
                          {`${bankAccount.institution_name} • • • ${bankAccount.last_four}`}
                        </div>
                      </div>
                    </div>
                    <Button
                      className={classNames(styles.iconButton, styles.deleteChoreButton)}
                      onClick={() => this.handleDeleteBankAccount()}
                      iconOnly
                      icon={trash}
                    />
                  </div>
                </div>
              }
            </Row>
          </Section>
        }
        <Section
          className={
            isFormEditing ? styles.DashboardContentEditing : styles.DashboardContent}
        >
          <Row>
            <Col md='4' />
            <Col md='4' align='center'>
              { this.renderViewInputs(this.profileFullNameView) }
            </Col>
            <Col md='4' />
          </Row>
          <Row>
            <Col md={isEmailEditing ? '2' : '4'} />
            <Col md={isEmailEditing ? '8' : '4'} align='center'>
              { isChild && this.renderViewInputs(this.profileDobView) }
              { this.renderEmail() }
            </Col>
            <Col md={isEmailEditing ? '2' : '4'} />
          </Row>
          <Row>
            <Col md={isPhoneEditing ? '2' : '4'} />
            <Col md={isPhoneEditing ? '8' : '4'} align='center'>
              { this.renderPhone() }
            </Col>
            <Col md={isPhoneEditing ? '2' : '4'} />
          </Row>
          { isRegistered &&
            <Row>
              <Col md={isAddressEditing ? '2' : '4'} />
              <Col md={isAddressEditing ? '8' : '4'} align='center'>
                { this.renderAddress() }
              </Col>
              <Col md={isAddressEditing ? '2' : '4'} />
            </Row>
          }
          <Row>
            <Col md={isPasswordEditing ? '2' : '4'} />
            <Col md={isPasswordEditing ? '8' : '4'} align='center'>
              { this.renderPassword() }
              <div className={styles.buttonGroup}>
                { this.renderPasswordButton() }
              </div>
            </Col>
            <Col md={isPasswordEditing ? '2' : '4'} />
          </Row>
        </Section>
        { showMailMessage &&
          <InfoModal onClose={this.handleCloseInfoWindow} message={emailMessage} />
        }
        { !hasLinkedBankAccount &&
          <LinkPlaiddModal onReload={this.initLoad} />
        }
      </Aux>
    )
  }
}

Profile.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  isChild: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  bankAccount: PropTypes.object,
  togglePlaidVisibility: PropTypes.func,
  deleteBankAccount: PropTypes.func,
  hasLinkedBankAccount: PropTypes.bool,
  currentUser: PropTypes.object,
  storeProfile: PropTypes.func,
}

Profile.defaultProps = {
  bankAccount: null,
  deleteBankAccount: () => {},
  hasLinkedBankAccount: true,
  currentUser: {},
  storeProfile: () => {},
  togglePlaidVisibility: (val) => { log.error(val) },
}


export default Profile
