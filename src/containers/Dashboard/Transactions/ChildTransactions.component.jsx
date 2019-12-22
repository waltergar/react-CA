import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import InfoRow from 'components/Core/InfoRow/InfoRow'
import Pagination from 'components/Core/Pagination/Pagination'
import TransactionDetailsModal from 'components/Dashboard/TransactionDetailsModal/TransactionDetailsModal'
import cardsConnector from 'store/cards/connector'
import globalsConnector from 'store/globals/connector'
import { naturalSortByAscending, naturalSortByDescending } from 'utils/formatters/sorting'
import { transactionsService as parentTransactionsService } from 'utils/api/parent'
import { log } from 'utils/log'
import styles from './Transactions.scss'

class Transactions extends Component {
  state = {
    transactions: [],
    paginatedTransactions: [],
    selectedTransaction: null,
    modalOpen: false,
    loading: false,
    error: false,
    currentPage: 1,
    itemsPerPage: 3,
    sortKey: 'purchase_timestamp',
    sortOrder: '',
  }

  componentDidMount() {
    this.filterTransactionsData()
    log.debug({ fn: 'Transactions.componentDidMount', props: this.props })
  }

  getPaginatedTransactions = (currentPage, itemsPerPage, transactions) => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return transactions.slice(indexOfFirstItem, indexOfLastItem)
  }

  getSortedTransactions = (sortKey, sortOrder, transactions) => {
    if (sortOrder === 'asc') {
      return naturalSortByAscending(transactions, sortKey)
    }
    return naturalSortByDescending(transactions, sortKey)
  }

  filterTransactionsData = () => {
    const { transactions } = this.props
    const showTransactions = transactions.filter(item => item.chore)
    const afterSetState = () => {
      log.debug({ fn: 'handleIncomingTransactionsData', stateData: this.state.transactions })
    }
    this.setState(prevState => ({ ...prevState, transactions: showTransactions }), afterSetState)
  }

  handleApproveChildPayment = transactionId => (
    parentTransactionsService
      .approveTransaction(transactionId)
      .then(this.props.fetchTransactionsData)
      .catch(this.props.handleIncomingTransactionsError)
  )

  handleDeclineChildPayment = transactionId => (
    parentTransactionsService
      .declineTransaction(transactionId)
      .then(this.props.fetchTransactionsData)
      .catch(this.props.handleIncomingTransactionsError)
  )

  handleRenderModal = transaction => (
    this.setState(() => ({ selectedTransaction: transaction }), () => (this.toggleModal()))
  )

  handlePaginate = (currentPage, itemsPerPage) => {
    const { sortKey, sortOrder, transactions } = this.state
    let sortedTransactions = transactions
    if (this.state.paginatedTransactions.length === 0 && transactions.length > 0) {
      sortedTransactions = this.getSortedTransactions(sortKey, sortOrder, transactions)
      this.setState(prevState => ({ ...prevState, transactions: sortedTransactions }))
    }
    const paginatedTransactions =
      this.getPaginatedTransactions(currentPage, itemsPerPage, sortedTransactions)
    this.setState(prevState => ({ ...prevState, currentPage, itemsPerPage, paginatedTransactions }))
  }

  handleSort = (sortKey, sortOrder) => {
    const { currentPage, itemsPerPage, transactions } = this.state
    const sortedTransactions = this.getSortedTransactions(sortKey, sortOrder, transactions)
    const paginatedTransactions =
      this.getPaginatedTransactions(currentPage, itemsPerPage, sortedTransactions)
    this.setState(prevState => ({ ...prevState,
      transactions: sortedTransactions,
      paginatedTransactions,
      sortKey,
      sortOrder,
    }))
  }

  toggleModal = () => (
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }))
  )

  renderActions = transactionId => (
    <Aux>
      <Button
        onClick={() => this.handleApproveChildPayment(transactionId)}
        className={styles.actionButton}
        text='Accept'
        textOnly
      />
      <Button
        onClick={() => this.handleDeclineChildPayment(transactionId)}
        className={styles.actionButton}
        text='Decline'
        textOnly
      />
    </Aux>
  )

  renderTransactions = () => {
    const { paginatedTransactions: transactions } = this.state
    const { getCardImageByCardId } = this.props
    return transactions.map(transaction => (
      <InfoRow key={transaction.merchant.name + transaction.id} className={styles.infoRow} >
        <InfoRow.Transaction
          transaction={transaction}
          actions={this.renderActions(transaction.id)}
          renderModal={this.handleRenderModal}
          card={getCardImageByCardId(transaction.cardId)}
        />
      </InfoRow>
    ))
  }

  render() {
    const { loading,
      error,
      transactions,
      selectedTransaction,
      modalOpen,
    } = this.state
    // const { isMobile } = this.props

    if (loading) return <div />
    if (error) return <h1>There was an error loading your chores</h1>
    return (
      <Aux>
        { transactions.length > 0 &&
          <div>
            { this.renderTransactions() }
            <Pagination
              items={transactions}
              handlePaginate={this.handlePaginate}
            />
          </div>
        }
        { !transactions.length &&
          <div className={styles.noResult}>No transactions</div>
        }
        { selectedTransaction && modalOpen && (
          <TransactionDetailsModal
            transaction={selectedTransaction}
            onClose={this.toggleModal}
          />
        )}
      </Aux>
    )
  }
}

Transactions.propTypes = {
  getCardImageByCardId: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  // isMobile: PropTypes.bool.isRequired,
  fetchTransactionsData: PropTypes.func.isRequired,
  handleIncomingTransactionsError: PropTypes.func.isRequired,
}

export default globalsConnector(cardsConnector(Transactions))
