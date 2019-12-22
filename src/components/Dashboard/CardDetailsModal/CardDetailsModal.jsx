import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { NavLink } from 'react-router-dom'
import { format, endOfMonth } from 'date-fns'
import classNames from 'classnames'

import featureService from 'utils/sdks/featureFlags'
import { choresFormatter } from 'utils/formatters/chores'
import { accountService, cardsService as parentCardsService, choresService as parentChoresService } from 'utils/api/parent'
import { log } from 'utils/log'
import { DELETE_CARD_BUTTON } from 'utils/constants'

import { Row, Col } from 'components/Core/Section/Section'
import Modal from 'components/Core/Modal/Modal'
import Button from 'components/Core/Button/Button'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import KeyValuePair from 'components/Core/KeyValuePair/KeyValuePair'

// import pause from 'assets/images/dashboard/pause.svg'
import trash from 'assets/images/dashboard/trashIcon.svg'
import backIcon from 'assets/images/dashboard/backIcon.svg'
import emojiNull from 'assets/images/dashboard/emoji-01.png'
import emojiPoor from 'assets/images/dashboard/emoji-02.png'
import emojiFair from 'assets/images/dashboard/emoji-03.png'
import emojiGood from 'assets/images/dashboard/emoji-04.png'
import emojiExcellent from 'assets/images/dashboard/emoji-05.png'
import tooltip from './tooltip'
import styles from './CardDetailsModal.scss'

class CardDetailsModal extends Component {
  state = {
    status: 'active',
    emojiList: {
      null: emojiNull,
      poor: emojiPoor,
      fair: emojiFair,
      good: emojiGood,
      excellent: emojiExcellent,
    },
    transactionsIsShowed: true,
    viewState: 1,
    isMobile: false,
    loading: false,
    error: false,
    chores: [],
    choresIsShowed: false,
    merchantDetailShowed: false,
    selectedTransaction: null,
  }

  componentDidMount() {
    const { card } = this.props
    this.updateDimensions()
    if (!this.props.isChild) this.fetchChoresData()
    window.addEventListener('resize', this.updateDimensions)
    if (card) {
      // eslint-disable-next-line
      this.setState(ps => ({ ...ps, status: card.status }))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  getValues = card => ([
    { title: 'Cardholder', value: card.cardHolder.firstName, avatar: card.avatar_url },
    { title: 'Available cash', value: card.details.availableCredit, tooltip: tooltip.cash_balance },
    { title: 'Account UserId', value: card.cardHolder.email },
    { title: 'Minimum Chore Amount Due', value: `$${card.details.minimumDue}`, tooltip: tooltip.minimum_chores_due },
    { title: 'Chores Due Date', value: card.details.dueDate, tooltip: tooltip.chores_due_date },
    { title: 'Funding Amount', value: card.details.creditLimit, tooltip: tooltip.funding_amount },
    { title: 'Status', value: card.status },
    { title: 'Credit Academy Score', value: <img src={this.state.emojiList[card.emoji]} alt={card.emoji} />, tooltip: tooltip.ca_score },
  ])

  updateDimensions = () => {
    const isMobile = window.innerWidth < 992
    this.setState(prevState => ({ ...prevState, isMobile }))
  }

  fetchChoresData = () => {
    parentChoresService
      .getChores()
      .then(this.handleIncomingChoresData)
      .catch(this.handleIncomingChoresError)
  }

  handleDeleteChore = chore => (
    parentChoresService
      .deleteChore(chore.id)
      .then(this.fetchChoresData)
      .catch(this.handleIncomingChoresError)
  )

  toggleLoader = loaderVisibility => (
    this.setState(
      prevState => ({ ...prevState, loading: loaderVisibility }),
      () => log.debug(this.state),
    )
  )

  handleIncomingChoresData = ({ data: chores }) => (
    this.setState(
      prevState => ({ ...prevState, chores: choresFormatter.normalizeData(chores) }),
      () => {
        this.toggleLoader(false)
        log.debug({ fn: 'handleIncomingChoresData', rawData: chores, stateData: this.state.chores })
      },
    )
  )

  handleIncomingChoresError = (error) => {
    this.setState(prevState => ({ ...prevState, error: true }))
    log.error(error)
  }

  handleInviteSuccess = () => {
    this.props.onClose()
  }

  handleInviteError = (error) => {
    this.setState(ps => ({ ...ps, error: true }))
    log.error(error)
  }

  handlePauseCardsData = () => {
    const newStatus = this.state.status === 'active' ? 'paused' : 'active'
    this.setState(ps => ({ ...ps, status: newStatus }))
  }

  handleIncomingCardsError = (error) => {
    this.setState(ps => ({ ...ps, error: true }))
    log.error(error)
  }

  handleInvite = () => {
    const { card } = this.props
    const payload = { email: card.cardHolder.email }
    accountService
      .reinviteChild(card.id, payload)
      .then(this.handleInviteSuccess)
      .catch(this.handleInviteError)
  }

  handleCardPause = () => {
    const { status } = this.state
    const { card } = this.props
    if (status) {
      if (status === 'active') {
        parentCardsService
          .pauseCard(card.id)
          .then(this.handlePauseCardsData)
          .catch(this.handleIncomingCardsError)
      } else {
        parentCardsService
          .unpauseCard(card.id)
          .then(this.handlePauseCardsData)
          .catch(this.handleIncomingCardsError)
      }
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      ...prevState,
      transactionsIsShowed: !prevState.transactionsIsShowed,
      choresIsShowed: false,
    }))
  }
  toggleCard = (val) => {
    this.setState({ viewState: val })
  }
  selectChores = (val) => {
    this.setState(prevState => ({ ...prevState, choresIsShowed: val }))
  }

  renderDot = color => (<div className={styles.colorDot} style={{ backgroundColor: color }} />)

  renderTransactions = () => {
    const { transactions } = this.props
    const { transactionsIsShowed } = this.state
    const saleTransactions = transactions.filter(item => item.type === 'sale' && item.status !== 'rejected')
    const rejectedTransactions = transactions.filter(item => item.type === 'sale' && item.status === 'rejected')
    const resultTransactions = transactionsIsShowed ? saleTransactions : rejectedTransactions
    if (resultTransactions.length === 0) {
      return <div className={styles.noResult}>No transactions</div>
    }
    return resultTransactions.map(transaction => (
      <Row key={transaction.merchant.name + transaction.id} className={styles.row}>
        <Col md='3' sm='3' xs='3' className={styles.transactionCol}>
          <div className={styles.date}>{transaction.date.purchase}</div>
        </Col>
        <Col md='6' sm='6' xs='6' className={styles.transactionCol}>
          <Button
            className={styles.name}
            text={transaction.merchant.name}
            textOnly
            onClick={() => this.setState(prevState => ({
              ...prevState,
              selectedTransaction: transaction,
              merchantDetailShowed: true,
            }))}
          />
        </Col>
        <Col md='3' sm='3' xs='3' className={styles.transactionCol}>
          <div className={styles.amount}>{transaction.amount}</div>
        </Col>
      </Row>
    ))
  }

  renderChildTransactions = () => {
    const { transactions } = this.props
    const { transactionsIsShowed } = this.state
    const saleTransactions = transactions.filter(item => item.status !== 'rejected' && item.type === 'sale')
    const rejectedTransactions = transactions.filter(item => item.type === 'sale' && item.status === 'rejected')
    const resultTransactions = transactionsIsShowed ? saleTransactions : rejectedTransactions
    if (resultTransactions.length === 0) {
      return <div className={styles.noResult}>No transactions</div>
    }
    return resultTransactions.map(transaction => (
      <Row key={transaction.merchant.name + transaction.id} className={styles.row}>
        <Col md='4' sm='4' xs='4' className={styles.transactionCol}>
          <div className={styles.date}>{transaction.date.purchase}</div>
        </Col>
        <Col md='5' sm='5' xs='5' className={styles.transactionCol}>
          <Button
            className={styles.name}
            text={transaction.merchant.name}
            textOnly
            onClick={() => this.setState(prevState => ({
              ...prevState,
              selectedTransaction: transaction,
              merchantDetailShowed: true,
            }))}
          />
        </Col>
        <Col md='3' sm='3' xs='3' className={styles.transactionCol}>
          <div className={styles.amount}>{transaction.amount}</div>
        </Col>
      </Row>
    ))
  }

  renderChores = () => {
    const { card } = this.props
    const { chores, loading, error } = this.state
    const filteredChores = chores.filter(item => item.cardId === card.id)
    if (error) return <div className={styles.noResult}>cannot fetch chores</div>
    if (loading) return <div className={styles.noResult}>loading...</div>
    if (filteredChores.length === 0) return <div className={styles.noResult}>No chores</div>
    return filteredChores.map(chore => (
      <Row key={chore.name + chore.id} className={styles.row}>
        <Col md='5' sm='5' xs='5' className={styles.transactionCol}>
          <div className={styles.date}>{chore.name}</div>
        </Col>
        <Col md='5' sm='5' xs='5' className={styles.transactionCol}>
          <div className={styles.amount}>{chore.rate}</div>
        </Col>
        <Col md='2' sm='2' xs='2' className={styles.transactionCol}>
          <Button
            className={classNames(styles.iconButton, styles.deleteChoreButton)}
            onClick={() => this.handleDeleteChore(chore)}
            iconOnly
            icon={trash}
          />
        </Col>
      </Row>
    ))
  }

  renderPayments = () => {
    const { transactions } = this.props
    const resultTransactions = transactions.filter(item => item.status !== 'rejected' && item.type === 'payment')
    if (resultTransactions.length === 0) return <div className={styles.noResult}>No payments</div>
    return resultTransactions.map(transaction => (
      <Row key={transaction.merchant.name + transaction.id} className={styles.row}>
        <Col md='4' sm='4' xs='4' className={styles.transactionCol}>
          <div className={styles.date}>{transaction.date.purchase}</div>
        </Col>
        <Col md='5' sm='5' xs='5' className={styles.transactionCol}>
          { transaction.chore &&
            <Button
              className={styles.name}
              text={transaction.chore.name}
              textOnly
              onClick={() => this.setState(prevState => ({
                ...prevState,
                selectedTransaction: transaction,
                merchantDetailShowed: true,
              }))}
            />
          }
        </Col>
        <Col md='3' sm='3' xs='3' className={styles.transactionCol}>
          <div className={styles.amount}>{transaction.amount}</div>
        </Col>
      </Row>
    ))
  }

  renderCards = () => {
    const {
      card,
      isChild,
    } = this.props
    const { isMobile } = this.state

    return (
      <Col lg='6' md='12' className={isMobile ? '' : styles.cardWrapper} >
        <VirtualCard
          className={styles.card}
          accountNumber={card.details.accountNumber}
          expirationDate={card.details.expirationDate}
          cvv={card.details.cvv}
          // image={cardImage.imageUrl}
          detailed
        />
        <div className={styles.keyValuePairs}>
          {
            this.getValues(card).map(value => (
              <KeyValuePair
                title={value.title}
                value={value.value}
                tooltip={value.tooltip}
                key={`${value.title} ${value.value}`}
                avatar={value.avatar ? value.avatar : null}
                isVertical
              />
            ))
          }
        </div>
        <div className={styles.buttonGroup}>
          {/* { !isChild &&
            <Button
              className={styles.button}
              text='Invite'
              nocap
              small
              onClick={this.handleInvite}
            />
          } */}
          { featureService(DELETE_CARD_BUTTON) &&
            !isChild &&
            <Button
              className={styles.button}
              // icon={trash} iconOnly
              text='Delete'
              nocap
              small
            />
          }
        </div>
      </Col>
    )
  }

  renderMerchantDetail = () => {
    const { selectedTransaction } = this.state
    let values = [
      { title: 'Transaction amount', value: selectedTransaction.amount ? selectedTransaction.amount : '' },
      { title: 'Transaction date', value: selectedTransaction.date.purchase ? selectedTransaction.date.purchase : '' },
      { title: 'Posted date', value: selectedTransaction.date.posted ? selectedTransaction.date.posted : '' },
      { title: 'Transaction type', value: selectedTransaction.type ? selectedTransaction.type : '' },
      { title: 'Transaction ID', value: selectedTransaction.vendorId ? selectedTransaction.vendorId : '' },
    ]
    const paymentValues = [
      { title: 'Chore', value: selectedTransaction.chore ? selectedTransaction.chore.name : '' },
      { title: 'Transaction amount', value: selectedTransaction.amount ? selectedTransaction.amount : '' },
      { title: 'Transaction date', value: selectedTransaction.date.purchase ? selectedTransaction.date.purchase : '' },
      { title: 'Posted date', value: selectedTransaction.date.posted ? selectedTransaction.date.posted : '' },
      { title: 'Transaction type', value: selectedTransaction.type ? selectedTransaction.type : '' },
      { title: 'Transaction ID', value: selectedTransaction.vendorId ? selectedTransaction.vendorId : '' },
    ]
    values = selectedTransaction.chore ? paymentValues : values
    return (
      <div style={{ padding: '0 5px' }}>
        {
          values.map(value => (
            <KeyValuePair
              title={value.title}
              value={value.value}
              key={`${value.title} ${value.value}`}
              isVertical
            />
        ))
      }
      </div>
    )
  }

  renderMerchantHeader = () => {
    const { selectedTransaction } = this.state
    return (
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 0' }}>
        <Button
          className={classNames(styles.iconButton, styles.backButton)}
          onClick={() => this.setState({ merchantDetailShowed: false })}
          iconOnly
          icon={backIcon}
        />
        <div className={styles.headerTitle}>{selectedTransaction.merchant.name}</div>
      </div>
    )
  }

  render() {
    const {
      onClose,
      card,
      isChild,
      // cardImage: { cardImage },
    } = this.props
    if (card.details.dueDate === 'N/A') {
      card.details.dueDate = format(endOfMonth(new Date()), 'MM/DD/YYYY')
    }
    const {
      transactionsIsShowed,
      isMobile,
      viewState,
      choresIsShowed,
      merchantDetailShowed,
    } = this.state
    const headerTitle = transactionsIsShowed ? 'Transactions' : 'Declines'
    const buttonText = transactionsIsShowed ? 'Show Declines' : 'Show Transactions'
    if (isMobile) {
      return (
        <Modal
          className={styles.CardDetailsModal}
          contentClassName={styles.mobileContent}
          onClose={onClose}
        >
          <Row>
            { !merchantDetailShowed &&
              <div className={styles.headerWrapper}>
                <div>
                  <Button className={classNames(styles.bigButton, viewState === 1 ? styles.isSelected : styles.noSelected)} text='Card' onClick={() => this.toggleCard(1)} textOnly />
                  <Button
                    className={
                      classNames(
                        styles.bigButton,
                        viewState === 2 ? styles.isSelected : styles.noSelected,
                      )}
                    text={headerTitle}
                    onClick={() => this.toggleCard(2)}
                    textOnly
                  />
                  <Button className={classNames(styles.bigButton, viewState === 3 ? styles.isSelected : styles.noSelected)} text={isChild ? 'Payments' : 'Chores'} onClick={() => this.toggleCard(3)} textOnly />
                </div>
                {
                  viewState === 2 &&
                    <Button
                      className={styles.transactionButton}
                      text={buttonText}
                      onClick={() => this.toggle()}
                      textOnly
                    />
                }
              </div>
            }
            { merchantDetailShowed &&
              this.renderMerchantHeader()
            }
            {
              !merchantDetailShowed && viewState === 1 &&
                this.renderCards()
            }
            {
              !merchantDetailShowed && viewState === 2 && !isChild &&
                <Col md='12'>
                  { this.renderTransactions() }
                </Col>
            }
            {
              !merchantDetailShowed && viewState === 2 && isChild &&
                <Col md='12'>
                  { this.renderChildTransactions() }
                </Col>
            }
            {
              !merchantDetailShowed && viewState === 3 &&
                <Col md='12'>
                  { isChild ? this.renderPayments() : this.renderChores() }
                </Col>
            }
            {
              merchantDetailShowed &&
              this.renderMerchantDetail()
            }
          </Row>
        </Modal>
      )
    }
    return (
      <Modal className={styles.CardDetailsModal} large onClose={onClose}>
        <Row>
          {
            this.renderCards()
          }
          <Col lg='6' md='12'>
            { !merchantDetailShowed &&
              <div className={styles.headerWrapper}>
                <Button
                  className={
                    classNames(
                      styles.bigButton,
                      !choresIsShowed ? styles.isSelected : styles.noSelected,
                    )
                  }
                  text={headerTitle}
                  onClick={() => this.selectChores(false)}
                  textOnly
                />
                { !isChild &&
                  <Button className={classNames(styles.bigButton, choresIsShowed ? styles.isSelected : styles.noSelected)} text='Chores' onClick={() => this.selectChores(true)} textOnly />
                }
                { isChild &&
                  <Button className={classNames(styles.bigButton, choresIsShowed ? styles.isSelected : styles.noSelected)} text='Payments' onClick={() => this.selectChores(true)} textOnly />
                }
                <Button
                  className={styles.transactionButton}
                  text={buttonText}
                  onClick={() => this.toggle()}
                  textOnly
                />
              </div>
            }
            { merchantDetailShowed &&
              this.renderMerchantHeader()
            }
            { !merchantDetailShowed && choresIsShowed && !isChild &&
              this.renderChores()
            }
            { !merchantDetailShowed && choresIsShowed && isChild &&
              this.renderPayments()
            }
            { !merchantDetailShowed && !choresIsShowed && !isChild &&
              this.renderTransactions()
            }
            { !merchantDetailShowed && !choresIsShowed && isChild &&
              this.renderChildTransactions()
            }
            {
              merchantDetailShowed &&
                this.renderMerchantDetail()
            }
          </Col>
        </Row>
      </Modal>
    )
  }
}

CardDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  isChild: PropTypes.bool,
  transactions: PropTypes.array,
  // cardImage: PropTypes.object,
}

CardDetailsModal.defaultProps = {
  isChild: false,
  transactions: [],
  // cardImage: {},
}

export default CardDetailsModal
