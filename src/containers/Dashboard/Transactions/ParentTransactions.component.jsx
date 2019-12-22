import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import InfoRow from 'components/Core/InfoRow/InfoRow'
import Pagination from 'components/Core/Pagination/Pagination'
import TransactionDetailsModal from 'components/Dashboard/TransactionDetailsModal/TransactionDetailsModal'
import Statements from 'components/Dashboard/Statements/Statements'

import { Row, Col } from 'components/Core/Section/Section'
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
    isRequesting: false,
    error: false,
    currentPage: 1,
    itemsPerPage: 3,
    sortKey: 'purchase_timestamp',
    sortOrder: '',
    isTransactions: true,
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

  downloadStatements = (stateId) => {
    parentTransactionsService
      .downloadStatements(stateId)
      .then(this.handleDownloadStatements)
      .catch(() => {
        this.setState(prevState => ({ ...prevState, error: true }))
      })
  }

  handleDownloadStatements = ({ data: pdfData }) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' })
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = 'statements.pdf'
    document.body.append(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  filterTransactionsData = () => {
    const { transactions } = this.props
    const showTransactions = transactions.filter(item => item.type === 'payment' || item.type === 'funding')
    const afterSetState = () => {
      log.debug({ fn: 'handleIncomingTransactionsData', stateData: this.state.transactions })
    }
    this.setState(prevState => ({ ...prevState, transactions: showTransactions }), afterSetState)
  }

  handleApproveChildPayment = (transactionId) => {
    this.setState({ isRequesting: true })
    parentTransactionsService
      .approveTransaction(transactionId)
      .then(() => {
        this.setState({ isRequesting: false })
        this.props.fetchTransactionsData()
      })
      .catch(this.props.handleIncomingTransactionsError)
  }

  handleDeclineChildPayment = (transactionId) => {
    this.setState({ isRequesting: true })
    parentTransactionsService
      .declineTransaction(transactionId)
      .then(() => {
        this.setState({ isRequesting: false })
        this.props.fetchTransactionsData()
      })
      .catch(this.props.handleIncomingTransactionsError)
  }

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

  toggleTransactions = (value) => {
    this.setState({ isTransactions: value })
  }

  renderActions = transactionId => (
    <Aux>
      <Button
        onClick={() => this.handleApproveChildPayment(transactionId)}
        className={styles.actionButton}
        text='Accept'
        textOnly
        disabled={this.state.isRequesting}
      />
      <Button
        onClick={() => this.handleDeclineChildPayment(transactionId)}
        className={styles.actionButton}
        text='Decline'
        textOnly
        disabled={this.state.isRequesting}
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
    const {
      loading,
      error,
      transactions,
      selectedTransaction,
      modalOpen,
      isTransactions,
    } = this.state
    const { isMobile, statements } = this.props
    if (loading) return <div />
    log.debug(error)
    // if (error) {
    //   return <div className={styles.noResult}>There was an error loading your transactions</div>
    // }
    return (
      <Aux>
        { !isMobile &&
          <Row className={styles.centerVertical}>
            <Col sm='4'>
              <Button
                className={
                  classNames(
                    styles.button,
                    styles.buttonBig,
                    isTransactions ? styles.selectedButton : styles.generalButton,
                  )}
                onClick={() => this.toggleTransactions(true)}
                text='Transactions'
                textOnly
              />
            </Col>
            <Col sm='4' />
            <Col sm='4' align='left'>
              <Button
                className={
                  classNames(
                    styles.button,
                    styles.marginLeft,
                    !isTransactions ? styles.selectedButton : styles.generalButton,
                  )}
                onClick={() => this.toggleTransactions(false)}
                text='Statements'
                textOnly
              />
            </Col>
          </Row>
        }
        { transactions.length > 0 && isTransactions &&
          <div>
            { this.renderTransactions() }
            <Pagination
              items={transactions}
              handlePaginate={this.handlePaginate}
            />
          </div>
        }
        { !transactions.length && isTransactions &&
          <div className={styles.noResult}>No transactions</div>
        }
        { !isTransactions &&
          <Statements statements={statements} downloadStatements={this.downloadStatements} />
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
  isMobile: PropTypes.bool.isRequired,
  statements: PropTypes.array.isRequired,
  fetchTransactionsData: PropTypes.func.isRequired,
  handleIncomingTransactionsError: PropTypes.func.isRequired,
}

export default Transactions
