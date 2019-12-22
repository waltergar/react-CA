import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Core/Modal/Modal'
import Button from 'components/Core/Button/Button'
import Textbox from 'components/Core/Textbox/Textbox'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'

import { log } from 'utils/log'
import { cardService as childCardService } from 'utils/api/child'
import { masks } from 'utils/formatters/validators'
import arrowIcon from 'assets/images/dashboard/transaction-arrow.svg'
import cardIcon from 'assets/images/dashboard/cardIcon.svg'
import styles from './VerifyCardModal.scss'


class VerifyCardModal extends Component {
  state = {
    loading: false,
    accountNumber: '',
    verified: false,
    errorMessage: null,
  }

  handleSetAccountNumber = accountNumber => (
    this.setState(prevState => ({ ...prevState, accountNumber }))
  )

  handleVerifyCard = () => {
    const { accountNumber } = this.state
    const payload = { number: accountNumber.replace(/\s+/g, '') }

    this.toggleLoader(true)

    childCardService.activateCard(payload)
      .then((response) => {
        this.toggleLoader(false)
        this.toggleVerified(true)
        this.handleErrorMessage(null)
        this.props.reloadCard()
        log.debug({ fn: 'ChildCard.handleVerifyCard', response, payload })
      })
      .catch((error) => {
        this.toggleLoader(false)
        this.handleErrorMessage('Whoops, looks like you submitted an invalid account number, try again.')
        log.error({ fn: 'ChildCard.handleVerifyCard', error, payload })
      })
  }

  handleErrorMessage = errorMessage => this.setState(prevState => ({ ...prevState, errorMessage }))
  toggleLoader = loading => this.setState(prevState => ({ ...prevState, loading }))
  toggleVerified = verified => this.setState(prevState => ({ ...prevState, verified }))

  render() {
    const { onClose, card } = this.props
    const { loading, errorMessage, verified, accountNumber } = this.state

    return (
      <Modal className={styles.CardDetailsModal} onClose={onClose}>
        <VirtualCard
          className={styles.card}
          accountNumber={card.details.accountNumber}
          name={card.cardHolder.fullName}
          // image={cardImage.imageUrl}
          // color={cardImage.color}
          nameOnly
        />

        { verified && <p>You are successfully verified!</p> }
        { !verified && <h1>Card Activation</h1> }
        { !verified && (
          <p>
            After you retrieve your 16 digit account number from your parent,
              enter it here to activate your card.
          </p>
        )}

        { !verified && (
          <Textbox
            className={styles.textbox}
            placeholder='0000 0000 0000 0000'
            icon={cardIcon}
            mask={masks.accountNumber}
            handleValueChange={this.handleSetAccountNumber}
          />
        )}

        { !verified && (
          <div className={styles.buttonGroup}>
            <Button
              className={styles.pay}
              icon={arrowIcon}
              onClick={this.handleVerifyCard}
              text='Verify Card'
              disabled={loading || accountNumber.length === 0}
              primary
              small
            />
          </div>
        )}

        { !verified && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p> }
      </Modal>
    )
  }
}

VerifyCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  // cardImage: PropTypes.object,
  reloadCard: PropTypes.func.isRequired,
}

VerifyCardModal.defaultProps = {
  // cardImage: {},
}

export default VerifyCardModal
