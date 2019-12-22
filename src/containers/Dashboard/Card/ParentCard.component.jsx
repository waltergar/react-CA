import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

// import { accountService as parentService } from 'utils/api/parent'
import { profileCardInfoFormatter } from 'utils/formatters/profile'
import { log } from 'utils/log'
// import history from 'utils/history'
// import { Col, Row } from 'components/Core/Section/Section'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import Button from 'components/Core/Button/Button'
import CardDetailsModal from 'components/Dashboard/CardDetailsModal/CardDetailsModal'
import CreateCardModal from 'components/Dashboard/CreateCardModal/CreateCardModal'
import LinkPlaiddModal from 'components/Dashboard/LinkPlaid/LinkPlaidModal'

import styles from './Card.scss'


class ParentCard extends Component {
  state = {
    modalOpen: false,
    selectedCard: null,
    loading: false,
    error: false,
    createCardOpen: false,
    step: 1,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
    this.props.togglePlaidVisibility(false)
    // parentService
    //   .getParent()
    //   .then(this.handleIncomingProfileData)
    //   .catch(this.handleIncomingDataError)
  }

  initLoad = () => {
    window.location.reload()
  }

  handleIncomingProfileData = ({ data: rawProfile }) => {
    const {
      subcards_limit_reached,
      registered_at_provider,
      hasLinkedBankAccount,
    } = profileCardInfoFormatter.normalizeData(rawProfile)
    this.setState(prevState => ({
      ...prevState,
      registered_at_provider,
      subcards_limit_reached,
      hasLinkedBankAccount,
    }))
  }

  handleCardClick = card => (
    this.setState(() => ({ selectedCard: card }), () => (this.toggleModal()))
  )

  toggleModal = () => (
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }))
  )

  handleClose = () => {
    this.toggleModal()
  }

  toggleCreateCardModal = (step) => {
    this.setState(prevState => ({ createCardOpen: !prevState.createCardOpen, step }))
  }

  openPlaid = () => {
    this.props.togglePlaidVisibility(true)
  }

  renderCardHeader = (loading, cards, subcards_limit_reached) => {
    const { currentUser: { bank_account: { status } } } = this.props
    return (
      <div className={styles.centerVertical}>
        <Button className={styles.buttonBig} text='My Cards' textOnly />
        <div className={styles.buttonGroup} align='right'>
          { cards.length > 0 &&
            <NavLink to='/dashboard/create-chore'><Button text='New Chores' className={styles.button} textOnly /></NavLink>
          }
          {!subcards_limit_reached && status === 'linked' && (
            <Button
              text='New Card'
              className={styles.button}
              textOnly
              onClick={() => this.toggleCreateCardModal(3)}
            />
            )
          }
        </div>
      </div>
    )
  }

  renderCards = () => this.props.cards.map(card => (
    <VirtualCard
      key={card.id}
      className={styles.virtualCard}
      onClick={() => this.handleCardClick(card)}
      accountNumber={card.details.accountNumber}
      name={card.cardHolder.firstName}
      // image={cardImage && cardImage.imageUrl}
      nameOnly
    />
  ))

  renderCardSection = () => (
    // const justifyElements = cards && cards.length < 5
    // <Row>
    <div className={styles.cardWrapper} >
      {this.renderCards()}
      {/* </div> */}
    </div>
    // </Row>
  )

  renderActivateCard = (type) => {
    const headerText = type === 0 ? 'Personal Information' : 'Link Funding Source'
    const contentText = type === 0 ?
      'To activate your account we require some personal information.' :
      'To start creating card accounts please link a funding source.'
    return (
      <div className={styles.cardContainer}>
        <div className={styles.activateCard}>
          <div className={styles.cardTitle}>{headerText}</div>
          <div className={styles.cardContent}>{contentText}</div>
          <Button
            className={styles.activeButton}
            text={type === 0 ? 'ACTIVATE' : 'LINK FUNDING SOURCE'}
            onClick={type === 0 ? () => this.toggleCreateCardModal(1) : () => this.openPlaid()}
            primary
          />
        </div>
      </div>
    )
  }

  render() {
    // const { getCardImageByCardId } = this.props
    const { loading, modalOpen, selectedCard, error, createCardOpen,
      step } = this.state
    const { isMobile, transactions, cards, hasLinkedBankAccount, isRegistered,
      currentUser: { subcards_limit_reached } } = this.props
    log.debug(this.props)
    const selectedTransactions = selectedCard ?
      transactions.filter(item => item.cardId === selectedCard.id) : []
    if (loading) return <div />

    return (
      <div className={styles.Card}>
        <div className={styles.activateCardWrapper}>
          { !isRegistered &&
            this.renderActivateCard(0)
          }
          { isRegistered && !hasLinkedBankAccount &&
            this.renderActivateCard(1)
          }
        </div>
        { !error && !isMobile && this.renderCardHeader(loading, cards, subcards_limit_reached)}
        { !error && cards.length > 0 && this.renderCardSection()}
        { !error && !cards.length &&
          <div className={styles.noResult}>No cards</div>
        }
        { error && <p>There was an error loading your cards, please try again.</p> }

        { selectedCard && modalOpen && (
          <CardDetailsModal
            card={selectedCard}
            onClose={this.handleClose}
            transactions={selectedTransactions}
            // cardImage={getCardImageByCardId(selectedCard.id)}
          />
        )}
        { createCardOpen && (
          <CreateCardModal
            onClose={this.toggleCreateCardModal}
            onReload={this.initLoad}
            step={step}
          />
        )
        }
        { !hasLinkedBankAccount &&
          <LinkPlaiddModal onReload={this.initLoad} />
        }
      </div>
    )
  }
}

ParentCard.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  transactions: PropTypes.array,
  cards: PropTypes.array,
  togglePlaidVisibility: PropTypes.func,
  // getCardImageByCardId: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  hasLinkedBankAccount: PropTypes.bool,
  isRegistered: PropTypes.bool,
}

ParentCard.defaultProps = {
  currentUser: { bank_account: { status: null } },
  transactions: [],
  cards: [],
  togglePlaidVisibility: (val) => { log.error(val) },
  isMobile: false,
  hasLinkedBankAccount: false,
  isRegistered: false,
}


export default ParentCard
