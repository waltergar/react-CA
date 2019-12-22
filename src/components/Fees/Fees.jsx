/* eslint-disable react/no-danger */
import React from 'react'
import classNames from 'classnames'

import { Row } from 'components/Core/Section/Section'
import styles from './Fees.scss'


const cols = {
  fee: 'Fee',
  description: 'Fee Description Online/Statement',
  amount: 'Fee Amount',
  detail: 'Details',
}

const rows = [{
  subtitle: 'Set-Up and Maintenance',
}, {
  fee: 'Monthly Subscription Fee',
  description: 'Monthly Fee',
  amount: '$9.95',
  detail: `This fee is charged on the 2nd of the calendar month following the month card
          enrollment is completed, and on the same day each month thereafter.`,
}, {
  subtitle: 'Other',
}, {
  fee: 'Inactivity Fee',
  description: 'Inactivity Fee',
  amount: '$4.95',
  detail: `This is our fee assessed to your Credit Academy Prepaid Mastercard account each
          calendar month after your card has had no activity (no purchase or reloads) for twelve (12)
          consecutive months.  The fee will be assessed beginning on the 2nd day of the 13th month.
          You can avoid this fee by using your card for the type of activities listed above, at least
          once each calendar year.`,
}]

// eslint-disable-next-line
const Fees = ({ isMobile }) => (
  <div className={classNames(styles.Fees)} id='card-fees'>
    <p><b>List of all fees for Credit Academy Prepaid Mastercard®</b></p>
    <table className={styles.feeTable}>
      <thead>
        <tr>
          {
            Object.values(cols).map(colName => (
              <th>{colName}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map(row => (
            <tr>
              {row.subtitle ?
                <td
                  colSpan='4'
                  className={styles.subtitle}
                  data-label=''
                  dangerouslySetInnerHTML={{ __html: row.subtitle }}
                />
              :
                Object.keys(cols).map(colKey => (
                  <td
                    data-label={cols[colKey]}
                    dangerouslySetInnerHTML={{ __html: row[colKey] }}
                  />
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    <Row className={styles.additional}>
      <p>
        Your funds are eligible for FDIC insurance. Your funds will be held at or transferred to
        Sunrise Banks N.A., an FDIC-insured institution. Once there, your funds are insured up to
        $250,000 by the FDIC in the event the Bank fails, if specific deposit insurance
        requirements are met and we have been able to verify your identity.
        See <a href="fdic.gov/deposit/deposits/prepaid.html" target="_blank">fdic.gov/deposit/deposits/prepaid.html</a> for details.
      </p>
      <p>No overdraft/credit feature.</p>
      <p>
        Contact us by calling 1-855-449-2273, by mail at FiCentive, P.O. Box 700172, San Antonio,
        TX, 78270, or visit <a href="creditacademy.io" target="_blank">creditacademy.io</a>.
      </p>
      <p>
        For general information about prepaid accounts, visit cfpb.gov/prepaid.<br />
        If you have a complaint about a prepaid account, call the Consumer Financial Protection
        Bureau at 1-855-411-2372 or visit <a href="cfpb.gov/complaint" target="_blank">cfpb.gov/complaint</a>.
      </p>
    </Row>
  </div>
)

export default Fees
