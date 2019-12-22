import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Core/Modal/Modal'
import KeyValuePair from 'components/Core/KeyValuePair/KeyValuePair'

import styles from './TransactionDetailsModal.scss'


const getValues = transaction => ([
  { title: 'Cardholder', value: transaction.cardHolder },
  { title: 'Transaction amount', value: transaction.amount },
  { title: 'Transaction date', value: transaction.date.purchase },
  { title: 'Posted date', value: transaction.date.posted },
  { title: 'Transaction type', value: transaction.type },
  { title: 'Transaction ID', value: transaction.vendorId ? transaction.vendorId : '' },
])

const getPaymentValues = transaction => ([
  { title: 'Chore', value: transaction.chore.name },
  { title: 'Cardholder', value: transaction.cardHolder },
  { title: 'Transaction amount', value: transaction.amount },
  { title: 'Transaction date', value: transaction.date.purchase },
  { title: 'Posted date', value: transaction.date.posted },
  { title: 'Transaction type', value: transaction.type },
  { title: 'Transaction ID', value: transaction.vendorId ? transaction.vendorId : '' },
])

const TransactionDetailsModal = ({ onClose, transaction }) => {
  const values = transaction.chore ? getPaymentValues(transaction) : getValues(transaction)
  return (
    <Modal className={styles.TransactionDetailsModal} onClose={onClose}>
      <div className={styles.keyValuePairs}>
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
    </Modal>
  )
}

TransactionDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
}

export default TransactionDetailsModal
