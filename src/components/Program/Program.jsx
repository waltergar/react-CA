import React from 'react'
import classNames from 'classnames'

import { Row, Col } from 'components/Core/Section/Section'
import styles from './Program.scss'

const feeValue = [
  { title: 'Monthly Subscription Fee', amount: '$ 9.95' },
  { title: 'Per Purchase', amount: '$ 0.00' },
  { title: 'ATM Withdrawal', amount: 'N/A' },
  { title: 'Cash Reload', amount: 'N/A' },
]
const feeContent = [
  { title: 'Customer Service', amount: '$ 0.00' },
  { title: 'Inactivity (after 12 months with no transactions)', amount: '$ 4.95' },
  { title: 'We charge 0 other types of fees.', amount: '' },
]

const renderFees = () => (
  feeContent.map(feeItem => (
    <Row className={styles.row} key={`feeContent:${feeItem.title}`}>
      <div className={styles.title}>
        <p>{feeItem.title}</p>
      </div>
      <div className={styles.amount}>
        <p className={styles.bold}>{feeItem.amount}</p>
      </div>
    </Row>
  ))
)

// eslint-disable-next-line
const Program = ({ isMobile }) => (
  <div className={classNames(styles.Program)} id='card-fees'>
    {isMobile ?
      feeValue.map(feeItem => (
        <Row className={styles.row} key='feeValue'>
          <div className={styles.title}>
            <p>{feeItem.title}</p>
          </div>
          <div className={styles.amount}>
            <p className={styles.bold}>{feeItem.amount}</p>
          </div>
        </Row>
      ))
    :
      <Row className={styles.row} key='feeValue'>
        {feeValue.map(feeItem => (
          <Col md='3' xs='12' key={`feeValue:${feeItem.title}`}>
            <div>
              <p>{feeItem.title}</p>
            </div>
            <div>
              <p className={styles.bold}>{feeItem.amount}</p>
            </div>
          </Col>
        ))}
      </Row>
    }
    {renderFees()}
    <Row className={classNames(styles.row)}>
      <div className={styles.title}>
        <p className={styles.second}><b>No overdraft/credit feature.</b></p>
        <p className={styles.second}>Your founds are eligible for FDIC insurance.</p>
        <p className={styles.second}>
          For general information about prepaid accounts, visit <a href="cfpb.gov/prepaid" target="_blank">cfpb.gov/prepaid</a>
        </p>
        <p className={styles.second}>
          Find details and conditions for all fees and services in the cardholder
          agreement or call <b>1-888-377-9776</b> or visit <a href="creditacademy.io" target="_blank"><b>creditacademy.io</b></a>.
        </p>
      </div>
    </Row>
    <Row className={styles.additional}>
      <p>Issued By: Sunrise Banks, N.A., Member FDIC</p>
      <p>Program Name: Credit Academy Prepaid Mastercard</p>
      <p>Enrollment Fee: $4.95</p>
    </Row>
  </div>
)

export default Program
