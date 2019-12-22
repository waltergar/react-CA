import React from 'react'
import classNames from 'classnames'

import { Row } from 'components/Core/Section/Section'
import styles from './Fees.scss'

const feeContent = [
  { title: 'One-time account setup fee', amount: '$4.95' },
  { title: 'Monthly subscription fee', amount: '$9.95*' },
]

const renderFees = () => (
  feeContent.map(feeItem => (
    <div className={styles.row} key={`feeItem:${feeItem.title}`}>
      <div className={styles.title}>
        <p>{feeItem.title}</p>
      </div>
      <div className={styles.amount}>
        <p className={styles.bold}>{feeItem.amount}</p>
      </div>
    </div>
  ))
)

// eslint-disable-next-line
const Fees = ({ transparent }) => (
  <div className={classNames(styles.Fees, { [styles.transparent]: transparent })} id='card-fees'>
    {renderFees()}
    <Row className={styles.additional}>* Teen accounts only</Row>
    <Row className={styles.additional}># See cardholder agreement for a full list of fees</Row>
  </div>
)

export default Fees
