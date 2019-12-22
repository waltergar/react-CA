import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import Content from 'components/Dashboard/Content/Content'
import { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import { NavLink } from 'react-router-dom'
import ParentCardContainer from 'containers/Dashboard/Card/ParentCard.container'
import CreateCardModal from 'components/Dashboard/CreateCardModal/CreateCardModal'
import LinkPlaiddModal from 'components/Dashboard/LinkPlaid/LinkPlaidModal'
import ChildCardContainer from 'containers/Dashboard/Card/ChildCard.container'
import ParentTransactions from 'containers/Dashboard/Transactions/ParentTransactions.container'
// import ChildTransactions from 'containers/Dashboard/Transactions/ChildTransactions.component'
import PayContainer from 'containers/Dashboard/Pay/Pay.container'
import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import cardsConnector from 'store/cards/connector'
import createCardConnector from 'store/createCard/connector'
import { transactionsService as parentTransactionsService, cardsService as parentCardsService } from 'utils/api/parent'
import { transactionsService as childTransactionsService, cardService as childCardService } from 'utils/api/child'
import { transactionsFormatter } from 'utils/formatters/transactions'
import { cardsFormatter } from 'utils/formatters/cards'
import { log } from 'utils/log'
import classNames from 'classnames'
import styles from '../../DashboardPage.scss'

class CardPage extends Component {
  state = {
    cardLoading: false,
    transLoading: false,
    isMobile: false,
    selectedButton: 'Cards',
    createCardOpen: false,
    step: 1,
    firstLoading: true,
    transactions: [],
    cards: [],
    statements: [],
  }

  componentDidMount() {
    this.props.togglePlaidVisibility(false)
    this.updateDimensions()
    this.firstLoaded()
    window.addEventListener('resize', this.updateDimensions)
    if (this.props.isRegistered || this.props.isChild) {
      this.fetchCardsData()
      this.fetchTransactionsData()
      this.getStatements()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    // this.setState({ cards: [], transactions: [] })
    // this.props.storeTransactions([])
    // this.props.storeCards([])
  }

  getStatements = () => {
    if (this.props.isParent) {
      parentTransactionsService
        .getStatements()
        .then((result) => {
          if (result.data.periods) this.setState({ statements: result.data.periods })
        })
        .catch(() => {
          this.setState(prevState => ({ ...prevState, error: true }))
        })
    }
  }

  firstLoaded = () => {
    this.setState(() => ({ firstLoading: false }))
  }

  updateDimensions = () => {
    const isMobile = window.innerWidth < 576
    this.setState(prevState => ({ ...prevState, isMobile }))
  }

  initLoad = () => {
    this.props.togglePlaidVisibility(false)
    window.location.reload()
  }

  openPlaid = () => {
    this.props.togglePlaidVisibility(true)
  }

  handleCardLoading = (loading) => {
    this.setState(ps => ({ ...ps, cardLoading: loading }))
    // if (this.state.isMobile) this.props.handlePageLoading(loading)
    this.props.handlePageLoading(loading || this.state.transLoading)
  }

  handleTransLoading = (loading) => {
    this.setState(ps => ({ ...ps, transLoading: loading }))
    // if (this.state.isMobile) this.props.handlePageLoading(loading)
    this.props.handlePageLoading(loading || this.state.cardLoading)
  }

  fetchCardsData = () => {
    this.handleCardLoading(true)
    if (this.props.isParent) {
      parentCardsService
        .getCards()
        .then(this.handleIncomingCardsData)
        .catch(this.handleIncomingDataError)
    } else {
      childCardService
        .getCard()
        .then(this.handleIncomingChildCardsData)
        .catch(this.handleIncomingChildCardsError)
    }
  }

  handleIncomingChildCardsData = ({ data: rawCard }) => {
    const cards = cardsFormatter.normalizeData([rawCard])
    const afterSetState = () => {
      this.handleCardLoading(false)
      this.props.storeCards([rawCard])
      log.debug({ fn: 'handleIncomingCardsData', rawData: [rawCard], stateData: this.state.cards })
    }

    this.setState(prevState => ({ ...prevState, cards }), afterSetState)
  }

  handleIncomingChildCardsError = (error) => {
    this.handleCardLoading(false)
    this.setState(prevState => ({ ...prevState, error: true }))
    log.error(error)
  }

  handleIncomingCardsData = ({ data: cards }) => {
    const formattedCards = cardsFormatter.normalizeData(cards)
    this.setState(
      prevState => ({ ...prevState, cards: formattedCards }),
      () => {
        this.handleCardLoading(false)
        this.props.storeCards(cards)
        log.debug({ fn: 'handleIncomingCardsData', rawData: cards, stateData: this.state.cards })
      },
    )
  }

  handleIncomingDataError = (error) => {
    this.handleCardLoading(false)
    this.setState(prevState => ({ ...prevState, error: true }))
    log.error(error)
  }

  fetchTransactionsData = () => {
    this.handleTransLoading(true)
    if (this.props.isParent) {
      parentTransactionsService
        .getTransactions()
        .then(this.handleIncomingTransactionsData)
        .catch(this.handleIncomingTransactionsError)
    } else {
      childTransactionsService
        .getTransactions()
        .then(this.handleIncomingTransactionsData)
        .catch(this.handleIncomingTransactionsError)
    }
  }

  handleIncomingTransactionsData = ({ data: rawTransactions }) => {
    const transactions = transactionsFormatter.normalizeData(rawTransactions)
    const afterSetState = () => {
      this.handleTransLoading(false)
      log.debug({ fn: 'handleIncomingTransactionsData', rawData: rawTransactions, stateData: this.state.transactions })
    }
    this.props.storeTransactions(transactions)
    this.setState(prevState => ({ ...prevState, transactions }), afterSetState)
  }

  handleIncomingTransactionsError = (error) => {
    const afterSetState = () => {
      this.handleTransLoading(false)
      log.error(error)
    }
    this.setState(prevState => ({ ...prevState, error: true }), afterSetState)
  }

  handleCards = () => {
    this.setState(() => ({ selectedButton: 'Cards' }))
  }

  handleTransactions = () => {
    this.setState(() => ({ selectedButton: 'Transactions' }))
  }

  toggleCreateCardModal = (step) => {
    this.setState(prevState => ({ createCardOpen: !prevState.createCardOpen, step }))
  }

  render() {
    const {
      isParent,
      isChild,
      hasLinkedBankAccount,
      currentUser: { subcards_limit_reached },
      isRegistered,
    } = this.props
    const {
      isMobile,
      selectedButton,
      createCardOpen,
      step,
      cards,
      cardLoading,
      transLoading,
      statements,
    } = this.state

    if (cardLoading || transLoading) return <div />
    if (isMobile) {
      return (
        <div>
          <Row className={styles.mobileWrapper}>
            {
              isParent &&
                <div className={styles.buttonGroup}>
                  <div className={styles.buttonWrapper} >
                    <Button
                      className={classNames(styles.button, selectedButton === 'Transactions' ? styles.selectedButton : styles.generalButton)}
                      onClick={this.handleTransactions}
                      text='Transactions'
                      textOnly
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    { cards.length > 0 &&
                      <NavLink to='/dashboard/create-chore'>
                        <Button text='New Chores' className={classNames(styles.button, styles.generalButton)} textOnly />
                      </NavLink>
                    }
                    {!subcards_limit_reached && hasLinkedBankAccount && (
                      <Button
                        className={classNames(styles.button, styles.generalButton)}
                        text='New Card'
                        onClick={() => this.toggleCreateCardModal(3)}
                        textOnly
                      />
                      )
                    }
                  </div>
                </div>
            }
            {
              isChild &&
                <div className={styles.buttonGroup} />
            }
            <Col sm='12' style={{ marginLeft: 15 }}>
              { isParent && selectedButton === 'Cards' && <ParentCardContainer isMobile={isMobile} /> }
              { isChild && selectedButton === 'Cards' && <ChildCardContainer isMobile={isMobile} /> }
              { isParent && selectedButton === 'Transactions' &&
                <ParentTransactions
                  isMobile={isMobile}
                  isRegistered={isRegistered}
                  fetchTransactionsData={this.fetchTransactionsData}
                  handleIncomingTransactionsError={this.handleIncomingTransactionsError}
                />
              }
              {/* { isChild && selectedButton === 'Transactions' && <PayContainer /> } */}
            </Col>
            { createCardOpen && (
              <CreateCardModal
                onClose={this.toggleCreateCardModal}
                onReload={this.initLoad}
                step={step}
              />
            )
            }
            { this.state.firstLoading &&
              <LinkPlaiddModal onReload={this.initLoad} />
            }
          </Row>
        </div>
      )
    }

    if (!isMobile && isChild) {
      return (
        <Row>
          <Col lg='12' md='12' sm='12' xl='12'>
            <div className={styles.contentLeft} >
              { isChild && <ChildCardContainer /> }
            </div>
          </Col>
        </Row>
      )
    }

    return (
      <div>
        <Row>
          <Col lg='12' md='12' sm='12' xl='6'>
            <div className={styles.contentLeft} >
              { isParent && <ParentCardContainer /> }
              { isChild && <ChildCardContainer /> }
            </div>
          </Col>
          <Col lg='12' md='12' sm='12' xl='6'>
            <div
              className={
                classNames(
                  styles.contentRight,
                  hasLinkedBankAccount ? styles.contentRightCard : styles.contentRightNoCard,
                )
              }
            >
              { isParent &&
                <ParentTransactions
                  isMobile={isMobile}
                  isRegistered={isRegistered}
                  statements={statements}
                  fetchTransactionsData={this.fetchTransactionsData}
                  handleIncomingTransactionsError={this.handleIncomingTransactionsError}
                />
              }
              { isChild &&
                // <ChildTransactions
                //   isMobile={isMobile}
                //   fetchTransactionsData={this.fetchTransactionsData}
                //   handleIncomingTransactionsError={this.handleIncomingTransactionsError}
                // />
                <PayContainer />
              }
            </div>
          </Col>
        </Row>
        { createCardOpen && (
          <CreateCardModal
            onClose={this.toggleCreateCardModal}
            onReload={this.initLoad}
            step={step}
          />
        )
        }
        { this.state.firstLoading &&
          <LinkPlaiddModal onReload={this.initLoad} />
        }
      </div>
    )
  }
}

CardPage.propTypes = {
  isParent: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool,
  isChild: PropTypes.bool.isRequired,
  hasLinkedBankAccount: PropTypes.bool.isRequired,
  handlePageLoading: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  togglePlaidVisibility: PropTypes.func.isRequired,
  storeTransactions: PropTypes.func.isRequired,
  storeCards: PropTypes.func.isRequired,
}

CardPage.defaultProps = {
  isRegistered: false,
}

export default globalsConnector(userConnector(cardsConnector(createCardConnector(CardPage))))
