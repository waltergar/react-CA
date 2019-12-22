import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Core/Modal/Modal'

import Button from 'components/Core/Button/Button'
import Section, { Row, Col } from 'components/Core/Section/Section'
import InfoModal from 'components/Dashboard/InfoModal/InfoModal'
import CreateSubCard from 'containers/Dashboard/CreateCard/CreateCardSteps/CreateSubCard.container'
import LinkPlaid from 'containers/Dashboard/CreateCard/CreateCardSteps/LinkPlaid.container'
import VerifyParent from 'containers/Dashboard/CreateCard/CreateCardSteps/VerifyParent.container'
import Confirmation from 'containers/Dashboard/CreateCard/CreateCardSteps/Confirmation.container'

import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import createCardConnector from 'store/createCard/connector'
import { cleansers } from 'utils/formatters/validators'

import { log } from 'utils/log'
import { accountService, cardsService, bankAccountService } from 'utils/api/parent'
import styles from './CreateCardModal.scss'

class CreateCardModal extends Component {
  state = {
    step: this.props.step,
    errorMessage: null,
    loading: false,
    success: false,
    confirmation: false,
    showModalErrorMessage: false,
    loadingGetUserData: true,
    originAddress: {},
    originPhone: '',
    errors: null,
    busy: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(true)
    this.handleGetUserResponse()
  }

  handleGetUserResponse = () => {
    const { currentUser: { first_name, last_name, phone, address } } = this.props
    const phone1 = phone.substr(0, 3)
    const phone2 = phone.substr(3, 3)
    const phone3 = phone.substr(6)
    const fullName = `${first_name} ${last_name}`
    const addressInfo = `${address.street_address},${address.city},${address.state} ${address.zipcode}, USA`
    const phoneStr = `${phone1}-${phone2}-${phone3}`
    this.props.storeParentFullName(fullName)
    this.props.storeParentPhone(phoneStr)
    this.props.storeParentAddress(addressInfo)
    this.setState(() => ({
      loadingGetUserData: false,
      originAddress: addressInfo,
      originPhone: phoneStr,
    }))
  }

  handleBeforeFileLoad = (elem) => {
    if (!elem.target.files[0]) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        showModalErrorMessage: true,
        errorMessage: 'Select photo file to upload!',
      }))
      return false
    }
    if (elem.target.files[0].size > 5000000) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        showModalErrorMessage: true,
        errorMessage: 'Max file size is 5M!',
      }))
      return false
    }
    return true
  }

  handleChangeStep = () => (
    this.handleCallApis()
  )

  handleCallApis = () => {
    const { isRegistered, hasLinkedBankAccount } = this.props
    const { step } = this.state

    log.debug({
      fn: 'CreateCard.handleChangeStep',
      state: this.state,
      isRegistered,
      hasLinkedBankAccount,
    })

    this.setState(prevState => ({ ...prevState, loading: true }))
    if (step === 3) this.handleCreateChildAccount()
    if (step === 2) this.handleLinkPlaidAccount()
    if (step === 1) this.handleVerifyParent()
  }

  handleVerifyParent = () => {
    const { parentPhone, parentAddress } = this.props
    const { originAddress, originPhone } = this.state
    const addressInfo = parentAddress.split(',')
    const state = addressInfo[2].trim().split(' ')[0]
    const zipcode = addressInfo[2].trim().split(' ')[1]
    const address = {
      street_address: addressInfo[0],
      city: addressInfo[1].trim(),
      state,
      zipcode,
    }
    let payload = {}
    if (originAddress !== parentAddress) payload = { ...payload, address }
    if (originPhone !== parentPhone) {
      payload = { ...payload, phone: cleansers.telephone(parentPhone) }
    }
    if (payload.phone || payload.address) {
      accountService
        .modifyParentProfile(payload)
        .then(() => {
          this.props.storeProfile({
            ...this.props.currentUser,
            phone: cleansers.telephone(parentPhone),
            address,
          })
        })
        .catch((error) => {
          log.debug(error)
        })
    }
    accountService
      .registerParentAkimbo(this.props.getParentVerificationForm())
      .then(this.handleVerifyUserResponse)
      .catch(this.handleVerifyUserServerError)
  }

  handleVerifyUserResponse = ({ status }) => {
    log.debug({ fn: 'handleVerifyUserResponse', status })
    if (status === 204) this.props.onReload()
    else if (status === 479) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There was an issue verifying your identity.',
      }))
    } else if (status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, it seems like you have already verified an account with us, if you believe this is a mistake, please contact support.',
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleUploadPhoto = (cardId) => {
    const param = this.props.getCardAvatar()
    const formData = new FormData()
    formData.append('file', param.file)
    cardsService
      .addCardAvatar(cardId, formData)
      .then(this.handleUploadPhotoResponse)
      .catch(this.handleUploadPhotoServerError)
  }

  handleUploadPhotoResponse = (res) => {
    log.debug({ fn: 'handleUploadPhotoResponse', res })

    // Successful
    if (res.status === 200 || res.status === 204) {
      this.setState(prevState => ({ ...prevState, loading: false, success: true }))
    } else if (res.status === 409) { // Conflicting User
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, teen account you tried to create already exists, if you believe this is a mistake, please contact support.',
      }))
    } else {
      log.error({ fn: 'handleUploadPhotoResponse', res })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleLinkPlaidAccount = () => (
    bankAccountService
      .linkAccount(this.props.getLinkPlaidForm())
      // .linkAccount({
      //   public_token: 'plaid-public-token',
      //   account_type: 'checking',
      //   selected_account: '1234',
      // })
      .then(this.handleLinkPlaidResponse)
      .catch(this.handlePlaidServerError)
  )

  handleAdditionalBankVerification = () => {
    bankAccountService.verifyLinkedAccount({
      routing: 'string',
      account: '1234',
      name: 'account_name',
      last_four: '1234',
    }).then(() => {
      this.props.onReload()
    })
      .catch(this.handlePlaidServerError)
  }

  handleLinkPlaidResponse = (res) => {
    log.debug({ fn: 'handleLinkPlaidResponse', res })
    if (res.status === 200 || res.status === 201) this.props.onReload()
    if (res.status === 285) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        requiresBankVerification: true,
      }))
      this.handleAdditionalBankVerification()
    }
    if (res.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, the bank you tried to link is already linked, if you believe this is a mistake, please contact support.',
      }))
    }
    if (res.status !== 200 && res.status !== 201 && res.status !== 285 && res.status !== 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleCreateChildAccount = () => (
    accountService
      .createChild(this.props.getCreateSubcardForm())
      .then(this.handleCreateChildResponse)
      .catch(this.handleChildServerError)
  )

  handleCreateChildResponse = (res) => {
    log.debug({ fn: 'handleCreateChildResponse', res })

    // Successful
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      this.setState(prevState => ({ ...prevState, loading: false, success: true }))
    } else if (res.status === 202) { // Busy system. Card will be created later
      this.setState(prevState => ({ ...prevState, loading: false, success: true, busy: true }))

      // this.handleUploadPhoto(res.data.card_id)
    } else if (res.status === 405) { // Conflicting User
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, your subcards has limit reached.',
      }))
    } else if (res.status === 409) { // Conflicting User
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, teen account you tried to create already exists, if you believe this is a mistake, please contact support.',
      }))
    } else { // Catch all for unhappy paths
      log.error({ fn: 'handleCreateChildResponse', res })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleVerifyUserServerError = (error) => {
    log.error({ fn: 'handleVerifyUserServerError', error })
    if (error.response && error.response.status === 479) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There was an issue verifying your identity, please contact support for additional help.',
      }))
    }
    if (error.response && error.response.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, it seems like you have already verified an account with us, if you believe this is a mistake, please contact support.',
      }))
    }
    if (error.response && error.response.status !== 479 && error.response.status !== 204) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }

    if (error.response && error.response.status === 400) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errors: error.response.data.errors,
      }))
    }
  }

  handleChildServerError = (error) => {
    log.error({ fn: 'handleChildServerError', error })

    // Conflicting User
    if (error.response && error.response.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, child user you tried to create already exists, if you believe this is a mistake, please contact support.',
      }))
    }

    // Catch all for unhappy paths
    if (error.response && error.response.status !== 409) {
      log.error({ fn: 'handleCreateChildResponse', error })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleUploadPhotoServerError = (error) => {
    log.error({ fn: 'handleUploadPhotoServerError', error })

    // Conflicting User
    if (error.response && error.response.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, teen account you tried to create already exists, if you believe this is a mistake, please contact support.',
      }))
    }

    // Catch all for unhappy paths
    if (error.response && error.response.status !== 409) {
      log.error({ fn: 'handleUploadPhotoServerError', error })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handlePlaidServerError = (error) => {
    log.error({ fn: 'handlePlaidServerError', error })

    // Conflicting Account
    if (error.response && error.response.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, the bank you tried to link is already linked, if you believe this is a mistake, please contact support.',
      }))
    }

    // Catch all for unhappy paths
    if (error.response && error.response.status !== 409) {
      log.error({ fn: 'handlePlaidServerError', error })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handleCloseInfoWindow = () => {
    this.setState(prevState => ({ ...prevState, showModalErrorMessage: false, errorMessage: null }))
  }

  renderStepContents = () => {
    const { step, loading, errors } = this.state
    const { onClose } = this.props

    if (step === 3) {
      return (
        <CreateSubCard
          handleChangeStep={this.handleChangeStep}
          handleBeforeFileLoad={this.handleBeforeFileLoad}
          loading={loading}
          step={step}
        />
      )
    }

    // if (step > 2 && requiresBankVerification) {
    //   return <p>Additional bank verification form.</p>
    // }

    if (step === 2) {
      return <LinkPlaid handleChangeStep={this.handleChangeStep} />
    }

    if (step === 1 && !this.state.loadingGetUserData) {
      return (
        <VerifyParent
          handleChangeStep={this.handleChangeStep}
          onCancel={onClose}
          errors={errors}
        />
      )
    }

    return <p>An error seems to have occurred, please try again.</p>
  }

  renderStepTitles = () => {
    const { step, errorMessage } = this.state
    const { isRegistered } = this.props

    if (step === 3) return ''
    // if (step === 3) return 'Select a card skin'
    // if (step === 3) return 'Upload a profile photo for your teen'
    if (step === 2) return 'Link a bank account'
    if (step === 1 && !isRegistered) {
      if (errorMessage) return 'There was an issue verifying your identity. Please try again.'
      return 'Please provide personal information in order to activate your account.'
    }
    return 'Error'
  }

  renderStepHeader = () => {
    const { step, errorMessage } = this.state
    let header = 'Funding Source'
    if (step === 3) header = ''
    if (step === 1) {
      header = 'Activate account'
      if (errorMessage) header = 'Bummer'
    }
    return header
  }

  renderTotalSteps = () => {
    const { isRegistered } = this.props
    if (isRegistered) return '3'
    return '4'
  }

  renderSuccessMessage = () => (
    <div className={styles.CreateCard}>
      <Section>
        <Row className={styles.header}>
          <Col md='12'>
            <h1>Success</h1>
            <p>You&apos;ve successfully created your teen&apos;s account!</p>
            <p>Click the link below to return to the dashboard.</p>
          </Col>
        </Row>
        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button primary text='Return to Dashboard' onClick={this.props.onReload} />
          </Col>
        </Row>
      </Section>
    </div>
  )

  renderBusySystemMessage = () => (
    <div className={styles.CreateCard}>
      <Section>
        <Row className={styles.header}>
          <Col md='12'>
            <h1>Success</h1>
            <p>You&apos;re child card issuing is in process!
              You will be notified on email when the card will be issued!
            </p>
            <p>Click the link below to return to the dashboard.</p>
          </Col>
        </Row>
        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button primary text='Return to Dashboard' onClick={this.props.onReload} />
          </Col>
        </Row>
      </Section>
    </div>
  )

  renderErrorMessage = () => (
    <div className={styles.CreateCard}>
      <Section>
        <Row className={styles.header}>
          <Col md='12'>
            <h1>Bummer</h1>
            <p>{this.state.errorMessage}</p>
            <p>Click the link below to return to the dashboard.</p>
          </Col>
        </Row>
        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button primary text='Return to Dashboard' onClick={this.props.onClose} />
          </Col>
        </Row>
      </Section>
    </div>
  )

  renderConfirmationScreen = () => (
    <div className={styles.CreateCard}>
      <Section>
        <Row className={styles.header}>
          <Col md='12'>
            <h1>Confirmation</h1>
          </Col>
        </Row>
        <Confirmation
          handleChangeStep={this.handleChangeStep}
          handleCallApis={this.handleCallApis}
          loading={this.state.loading}
        />
      </Section>
    </div>
  )

  render() {
    const { success, errorMessage, confirmation, showModalErrorMessage, busy } = this.state
    const { onClose } = this.props
    log.debug({ fn: 'CreateCard.render', state: this.state })

    if (busy && success) {
      return (
        <Modal
          className={styles.CreateCardModal}
          onClose={onClose}
          contentClassName={styles.content}
          sectionClassName={styles.modalSection}
        >
          {
            this.renderBusySystemMessage()
          }
        </Modal>
      )
    }
    if (success) {
      return (
        <Modal
          className={styles.CreateCardModal}
          onClose={onClose}
          contentClassName={styles.content}
          sectionClassName={styles.modalSection}
        >
          {
            this.renderSuccessMessage()
          }
        </Modal>
      )
    }
    if (confirmation) {
      return (
        <Modal
          className={styles.CreateCardModal}
          onClose={onClose}
          contentClassName={styles.content}
          sectionClassName={styles.modalSection}
        >
          {
            this.renderConfirmationScreen()
          }
        </Modal>
      )
    }
    return (
      <Modal
        className={styles.CreateCardModal}
        onClose={errorMessage ? null : onClose}
        contentClassName={styles.content}
      >
        <Section className={styles.modalSection}>
          <Row className={styles.header}>
            <Col md='12'>
              <h1>{ this.renderStepHeader() }</h1>
              <p>{ this.renderStepTitles() }</p>
            </Col>
          </Row>
          { this.renderStepContents() }
        </Section>
        { showModalErrorMessage &&
          <InfoModal onClose={this.handleCloseInfoWindow} message={errorMessage} />
        }
      </Modal>
    )
  }
}

CreateCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  hasLinkedBankAccount: PropTypes.bool.isRequired,
  getCreateSubcardForm: PropTypes.func.isRequired,
  getCardAvatar: PropTypes.func.isRequired,
  getLinkPlaidForm: PropTypes.func.isRequired,
  getParentVerificationForm: PropTypes.func.isRequired,
  storeParentFullName: PropTypes.func.isRequired,
  storeParentAddress: PropTypes.func.isRequired,
  storeParentPhone: PropTypes.func.isRequired,
  storeProfile: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  toggleHeaderTransparency: PropTypes.func.isRequired,
  parentPhone: PropTypes.string.isRequired,
  parentAddress: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default globalsConnector(userConnector(createCardConnector(CreateCardModal)))
