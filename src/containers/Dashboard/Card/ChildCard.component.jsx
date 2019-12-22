import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { NavLink } from 'react-router-dom'
import Button from 'components/Core/Button/Button'
import { Row, Col } from 'components/Core/Section/Section'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import CardDetailsModal from 'components/Dashboard/CardDetailsModal/CardDetailsModal'
import VerifyCardModal from 'components/Dashboard/VerifyCardModal/VerifyCardModal'
import { cardService as childCardService } from 'utils/api/child'
import transactionArrow from 'assets/images/dashboard/transaction-arrow.svg'
import { log } from 'utils/log'

import styles from './Card.scss'


const LightTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(24),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}))(Tooltip)

const tooltip = `Current balance reflects your total purchase amount with the option to pay back
  your parent by doing chores by clicking the “pay” button.`

class ChildCard extends Component {
  state = {
    modalOpen: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
  }

  toggleModal = () => (
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }))
  )

  fetchCardsData = () => {
    childCardService
      .getCard()
      .then(this.handleIncomingChildCardsData)
      .catch(this.handleIncomingChildCardsError)
  }

  handleIncomingChildCardsData = ({ data: rawCard }) => {
    this.setState({ loading: true })
    const afterSetState = () => {
      this.props.storeCards([rawCard])
      log.debug({ fn: 'handleIncomingCardsData', rawData: [rawCard], stateData: this.state.cards })
    }

    this.setState(prevState => ({ ...prevState, loading: false, modalOpen: false }), afterSetState)
  }

  handleIncomingChildCardsError = (error) => {
    this.setState({ loading: true })
    this.setState(prevState => ({ ...prevState, error: true, loading: false, modalOpen: false }))
    log.error(error)
  }

  renderHeader = () => {
    const strBalance = this.props.cards[0].details.currentBalance
    const balance = strBalance.substr(1)
    return (
      <Row className={styles.centerVertical}>
        <Col md='4' />
        <Col md='4' className={styles.childCardHeader}>
          <h1>{this.props.cards[0].details.currentBalance}</h1>
          <LightTooltip title={tooltip} placement='bottom'>
            <p>Current Balance</p>
          </LightTooltip>
          { balance >= 1 &&
            <NavLink to='/dashboard/pay'>
              <Button className={styles.pay} icon={transactionArrow} text='Pay' small />
            </NavLink>
          }
        </Col>
        <Col md='4' align='right' />
      </Row>
    )
  }

  renderCardSection = (card) => {
    // const { getCardImageByCardId } = this.props
    // const { cardImage } = getCardImageByCardId(card.id)
    const cardStatus = card.status
    let virtualCard

    if (cardStatus === 'funded') {
      virtualCard = (
        <VirtualCard
          onClick={this.toggleModal}
          accountNumber={card.details.accountNumber}
          name={card.cardHolder.fullName}
          // image={cardImage && cardImage.imageUrl}
          // color={cardImage && cardImage.color}
          className={styles.pendingVerification}
          nameOnly
        />
      )
    }

    if (cardStatus === 'active') {
      virtualCard = (
        <VirtualCard
          onClick={this.toggleModal}
          accountNumber={card.details.accountNumber}
          name={card.cardHolder.firstName}
          // image={cardImage && cardImage.imageUrl}
          // color={cardImage && cardImage.color}
          nameOnly
        />
      )
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        {virtualCard}
      </div>
    )
  }

  render() {
    const { transactions, cards } = this.props
    const { loading, modalOpen, error } = this.state

    if (loading) return <div />
    const hasCard = cards.length === 1
    const card = cards[0]
    const selectedTransactions = card ? transactions.filter(item => item.cardId === card.id) : []

    return (
      <div className={styles.Card}>
        { !error && hasCard && this.renderHeader() }
        { !error && hasCard && this.renderCardSection(card) }
        { !error && !hasCard &&
          <div className={styles.noResult}>No cards</div>
        }
        { error && <p>There was an error loading your cards, please try again.</p> }
        { modalOpen && card.status === 'active' && (
          <CardDetailsModal
            card={card}
            onClose={this.toggleModal}
            onSubmit={this.toggleModal}
            transactions={selectedTransactions}
            // cardImage={getCardImageByCardId(card.id)}
            isChild
          />
        )}

        { modalOpen && card.status === 'funded' && (
          <VerifyCardModal
            card={card}
            onClose={this.toggleModal}
            // cardImage={getCardImageByCardId(card.id)}
            reloadCard={this.fetchCardsData}
          />
        )}
      </div>
    )
  }
}

ChildCard.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  transactions: PropTypes.array,
  cards: PropTypes.array,
  storeCards: PropTypes.func.isRequired,
  // getCardImageByCardId: PropTypes.func.isRequired,
}

ChildCard.defaultProps = {
  transactions: [],
  cards: [],
}


export default ChildCard
