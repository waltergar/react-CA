import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import withResponsiveComponent from 'components/Hoc/Responsive/Responsive'
import { Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import styles from '../InfoRow.scss'


const STATUS = {
  INTERNAL_PENDING: 'internal_pending',
  PENDING: 'pending',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
}

class Transaction extends Component {
  renderTransactionSummary = () => {
    const { transaction, transaction: { status: tStatus } } = this.props

    const status = tStatus === STATUS.INTERNAL_PENDING ? 'Pending' : tStatus
    const statusClassName = classNames(
      styles.status,
      { [styles.warn]: tStatus === STATUS.REJECTED },
      { [styles.info]: tStatus === STATUS.INTERNAL_PENDING || tStatus === STATUS.PENDING },
      { [styles.success]: tStatus === STATUS.COMPLETED },
    )

    return (
      <div className={styles.summary}>
        <p className={styles.name}>{transaction.merchant.name}</p>
        <p className={styles.category}>{transaction.type}</p>
        <p className={statusClassName}>{status}</p>
      </div>
    )
  }

  renderAction = (filter = null) => {
    const { actions, transaction } = this.props

    if (transaction.status === STATUS.INTERNAL_PENDING) {
      return filter !== 'info' && <div className={classNames(styles.actions, styles.left)}>{actions}</div>
    }
    return null
  }

  renderParentTransaction = () => {
    const { transaction, isMobile, renderModal } = this.props

    if (isMobile) {
      return (
        <Aux>
          <div className={styles.flexRow}>
            <Col xs='5'>
              <Button
                className={styles.name}
                textOnly
                onClick={() => renderModal(transaction)}
                text={transaction.cardHolder}
              />
              <div className={styles.date}>{transaction.date.purchase}</div>
            </Col>
            <Col xs='5'>
              <div className={styles.amount}>{transaction.amount}</div>
              <div className={styles.category}>{transaction.type}</div>
            </Col>
          </div>
          <div className={styles.flexRow}>
            <Col xs='12'>{ this.renderAction('buttons') }</Col>
          </div>
        </Aux>
      )
    }

    return (
      <Aux>
        <Col md='3'><div className={styles.date}>{transaction.date.purchase}</div></Col>
        <Col md='3'>
          <Button
            className={styles.name}
            textOnly
            onClick={() => renderModal(transaction)}
            text={transaction.cardHolder}
          />
        </Col>
        <Col md='2'><div className={styles.category}>{transaction.type}</div></Col>
        <Col md='1'><div className={styles.amount}>{transaction.amount}</div></Col>
        <Col md='5'>{ this.renderAction() }</Col>
      </Aux>
    )
  }

  renderChildTransaction = () => {
    const { transaction, isMobile } = this.props

    if (isMobile) {
      return (
        <Aux>
          <Col xs='6' md='6'>{ this.renderTransactionSummary() }</Col>
          <Col xs='5' md='5'>
            <div className={styles.date}>{transaction.date.purchase}</div>
            <div className={styles.amount}>{transaction.amount}</div>
          </Col>
          <Col xs='1' md='1'>{ this.renderAction() }</Col>
        </Aux>
      )
    }

    return (
      <Aux>
        <Col md='8'>{ this.renderTransactionSummary() }</Col>
        <Col md='2'><div className={styles.date}>{transaction.date.purchase}</div></Col>
        <Col md='1'><div className={styles.amount}>{transaction.amount}</div></Col>
        <Col md='1'>{ this.renderAction() }</Col>
      </Aux>
    )
  }

  render() {
    const className = classNames(
      styles.InfoRowItem,
      styles.Transaction,
      styles.transactionRow,
      styles.parentTransaction,
      // { [styles.parentTransaction]: !isChild },
    )

    return (
      <div className={className}>
        {/* { isChild ? this.renderChildTransaction() : this.renderParentTransaction() } */}
        { this.renderParentTransaction() }
      </div>
    )
  }
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  renderModal: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  actions: PropTypes.node,
}

Transaction.defaultProps = {
  actions: null,
}


export default withResponsiveComponent(Transaction)
