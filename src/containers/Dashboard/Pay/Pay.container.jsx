import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'

// import Aux from 'components/Hoc/Aux/Aux'
import Section from 'components/Core/Section/Section'
import Modal from 'components/Core/Modal/Modal'
import InfoRow from 'components/Core/InfoRow/InfoRow'

import { choresService as payService } from 'utils/api/child'
import { choresFormatter } from 'utils/formatters/chores'
import { log } from 'utils/log'
import globalConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import successIcon from 'assets/images/dashboard/successCheckIcon.svg'
import errorIcon from 'assets/images/dashboard/errorIcon.svg'
import styles from './Pay.scss'


class PayContainer extends Component {
  state = {
    chores: [],
    loading: false,
    paymentSuccess: false,
    paymentError: false,
    choresError: false,
    isRequesting: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
    this.fetchChoresData()
  }

  toggleLoader = loading => (
    this.setState(prevState => ({ ...prevState, loading }), () => log.debug(this.state))
  )

  fetchChoresData = () => {
    this.toggleLoader(true)
    payService
      .getChores()
      .then(this.handleIncomingChoresData)
      .catch(this.handleIncomingChoresError)
  }

  handleIncomingChoresData = ({ data: chores }) => (
    this.setState(
      prevState => ({ ...prevState, chores: choresFormatter.normalizeData(chores) }),
      () => this.toggleLoader(false),
    )
  )

  handleIncomingChoresError = (error) => {
    this.setState(prevState => ({ ...prevState, choresError: true }))
    log.error(error)
  }

  handleSubmitPayment = (chore) => {
    this.setState({ isRequesting: true })
    payService
      .requestPayment(chore.id)
      .then(this.handleSubmitPaymentSuccess)
      .catch(this.handleSubmitPaymentError)
  }

  handleSubmitPaymentSuccess = () => (
    this.setState(
      prevState => ({ ...prevState, paymentSuccess: true, isRequesting: false }),
      () => setTimeout(() =>
        this.setState(prevState => ({ ...prevState, paymentSuccess: false })), 2000),
    )
  )

  handleSubmitPaymentError = error => (
    this.setState(
      prevState => ({ ...prevState, paymentError: true, isRequesting: false }),
      () => {
        setTimeout(() => this.setState(prevState => ({ ...prevState, paymentError: false })), 2000)
        log.error(error)
      },
    )
  )

  renderChores = () => (
    this.state.chores.map(chore => (
      <InfoRow key={`${chore.id} ${chore.name}`}>
        <InfoRow.Chore
          chore={chore}
          submitPayment={this.handleSubmitPayment}
          isChild
          loading={this.state.isRequesting}
        />
      </InfoRow>
    ))
  )

  renderPaymentModal = error => (
    <Modal className={styles.PaymentSuccessModal} onClose={null} show>
      <div className={styles.content}>
        <SvgInline svg={error ? errorIcon : successIcon} />
        <p className={styles.text}>{ error ? 'There was an issue submitting your payment.' : 'Thank you for your payment!' }</p>
      </div>
    </Modal>
  )

  render() {
    const { chores, paymentSuccess, paymentError, loading, choresError } = this.state
    const allGood = !loading && !choresError

    if (loading) return <div />
    if (paymentSuccess) return this.renderPaymentModal()
    if (paymentError) return this.renderPaymentModal(true)

    return (
      <div className={styles.ChoresContainer}>
        <Section rounded className={styles.DashboardContent}>
          { allGood && !chores.length && (
            <h3 className={styles.noChore}>
              You have no chores to complete, ask your parents to create a chore.
            </h3>
          )}
          { allGood && chores.length > 0 && (
            <div style={{ marginLeft: -5 }}>
              <div className={styles.header}>Chore list</div>
              { this.renderChores() }
            </div>
          )}
        </Section>
      </div>
    )
  }
}

PayContainer.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
}

export default globalConnector(userConnector(PayContainer))
