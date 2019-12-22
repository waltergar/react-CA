import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlaid, { AUTH_PRODUCT } from 'react-plaid'

import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import Modal from 'components/Core/Modal/Modal'
import { Row, Col } from 'components/Core/Section/Section'
import { log } from 'utils/log'

import { bankAccountService } from 'utils/api/parent'
import styles from '../CreateCard.scss'


class LinkPlaid extends Component {
  state = {
    selectedAccount: null,
    prematureExit: false,
    isOpenDelete: false,
    loading: false,
    errorMessage: null,
  }

  componentDidMount() {
    const { hasLinkedBankAccount } = this.props
    if (!hasLinkedBankAccount) {
      this.props.togglePlaidVisibility(true)
    }
  }

  openDeleteConfirmation = () => {
    this.setState(prevState => ({
      ...prevState,
      isOpenDelete: true,
    }))
  }

  closeDeleteConfirmation = () => {
    this.setState(prevState => ({
      ...prevState,
      isOpenDelete: false,
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
        this.props.togglePlaidVisibility(true)
      })
    } else if (res.status === 404) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, linked bank account not found, if you believe this is a mistake, please contact support.',
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
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
        errorMessage: 'Hmm, linked bank account not found, if you believe this is a mistake, please contact support.',
      }))
    }

    // Catch all for unhappy paths
    if (error.response && error.response.status !== 404) {
      log.error({ fn: 'handleDeleteBankError', error })
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  handlePlaidOnSuccess = (token, metaData) => {
    log.debug({ fn: 'LinkPlaid.handleStorePlaidResponse', token, metaData })
    this.setState(prevState => ({ ...prevState, selectedAccount: metaData.account }))
    this.props.storePlaidToken(token)
    this.props.storePlaidMeta(metaData)
    this.props.togglePlaidVisibility(false)
  }

  handlePlaidOnExit = () => {
    log.debug({ fn: 'handlePlaidOnExit' })
    this.setState(prevState => ({ ...prevState, prematureExit: true }))
    this.props.togglePlaidVisibility(false)
  }

  handleReopenPlaid = () => {
    log.debug({ fn: 'handleReopenPlaid' })
    this.setState(prevState => ({ ...prevState, prematureExit: false }))
    this.props.togglePlaidVisibility(true)
  }

  renderSelectedAccountText = () => {
    log.debug({ fn: 'renderSelectedAccountText', state: this.state })
    const { subtype, mask } = this.state.selectedAccount
    return (
      <div className={styles.plaidContent}>
        <p className={styles.plaidText}>
          Are you ready to link your <strong>{subtype} account </strong>
          ending in <strong>{mask}</strong>?
        </p>
      </div>
    )
  }

  render() {
    const {
      isPlaidVisible,
      hasLinkedBankAccount,
      bankAccount,
      handleChangeStep,
    } = this.props
    const {
      selectedAccount,
      prematureExit,
      isOpenDelete,
      loading,
      errorMessage,
    } = this.state

    const plaidConfig = {
      clientName: 'Credit Academy',
      product: [AUTH_PRODUCT],
      apiKey: process.env.REACT_APP_PLAID_PUBLIC_KEY,
      env: process.env.REACT_APP_PLAID_ENV,
      open: isPlaidVisible,
      selectAccount: true,
      onSuccess: this.handlePlaidOnSuccess,
      onExit: this.handlePlaidOnExit,
    }

    log.debug({ fn: 'LinkPlaid.render', plaidConfig })

    if (loading) return <p>Loading ...</p>

    return (
      <Aux>
        {hasLinkedBankAccount ?
          <Row className={styles.form}>
            <Col md='2' />
            <Col md='8'>
              <Row className={styles.plaidContent}>
                <Col>
                  <p>
                    {errorMessage ?
                      this.state.errorMessage
                    :
                      `${bankAccount.name} *****${bankAccount.last_four}`
                    }
                  </p>
                </Col>
                <Col>
                  <Button onClick={this.openDeleteConfirmation} text='Delete' primary small />
                </Col>
              </Row>
            </Col>
            <Col md='2' />
          </Row>
        :
          <Row className={styles.form}>
            <Col md='2' />
            <Col md='8' align='center'>
              <ReactPlaid {...plaidConfig} />
              { prematureExit && (
                <div className={styles.plaidContent}>
                  <p>
                    Whoops, you did not link a bank account!
                    <Button onClick={this.handleReopenPlaid} text='Try Again' primary small />
                  </p>
                </div>
              )}
              { selectedAccount && !isPlaidVisible && this.renderSelectedAccountText() }
            </Col>
            <Col md='2' />
          </Row>
        }
        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button
              primary
              disabled={!selectedAccount && !hasLinkedBankAccount}
              onClick={() => handleChangeStep()}
              small
              text={hasLinkedBankAccount ? 'Next' : 'Link Bank Account'}
            />
          </Col>
        </Row>
        {isOpenDelete && (
          <Modal>
            <div>
              <h3>Confirmation</h3>
              <br />
              <p>
                Are you sure you wish to delete bank account?
              </p>
              <Row className={styles.confirmButtonGroup}>
                <Button onClick={this.closeDeleteConfirmation} secondary small>No</Button>
                <Button onClick={this.handleDeleteBankAccount} primary small>Yes</Button>
              </Row>
            </div>
          </Modal>
        )}
      </Aux>
    )
  }
}

LinkPlaid.propTypes = {
  handleChangeStep: PropTypes.func.isRequired,

  bankAccount: PropTypes.object,
  hasLinkedBankAccount: PropTypes.bool.isRequired,
  isPlaidVisible: PropTypes.bool.isRequired,

  togglePlaidVisibility: PropTypes.func.isRequired,
  storePlaidToken: PropTypes.func.isRequired,
  storePlaidMeta: PropTypes.func.isRequired,
  deleteBankAccount: PropTypes.func.isRequired,
}


LinkPlaid.defaultProps = {
  bankAccount: null,
}

export default LinkPlaid
