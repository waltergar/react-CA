/* eslint-disable react/no-danger */
import React from 'react'
import classNames from 'classnames'

import { Row, Col } from 'components/Core/Section/Section'
import helpText from './cardholderAgreementText'
import styles from './CardholderAgreement.scss'


const feeCols = {
  fee: 'Fee',
  description: 'Fee Description Online/Statement',
  amount: 'Fee Amount',
  detail: 'Details',
}

const feeRows = [{
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

const limitCols = {
  type: 'Limitation Type',
  limit: 'Frequency and/or Dollar Limits (for typical transactions)',
}

const limitRows = [{
  subtitle: 'Virtual Card Limits',
}, {
  type: 'Maximum Virtual Card Account balance',
  limit: '$9999 at any given time',
}, {
  subtitle: 'Virtual Load Limits',
}, {
  type: 'Direct Deposits',
  limit: 'N/A',
}, {
  type: 'Transfers from Your Bank Account or Debit Card',
  limit: '$1,000.00 per day',
}, {
  type: 'Virtual Card-to-Card Transfers',
  limit: '$1,000.00 per day',
}, {
  subtitle: 'Virtual Spend Limits',
}, {
  type: 'Cash Withdrawals (ATM or POS)',
  limit: 'N/A',
}, {
  type: 'Cash Withdrawal (Over the Counter from Bank Teller)',
  limit: 'N/A',
}, {
  type: 'Transfer to Your Bank Account',
  limit: '$1,000.00 per day',
}]

const infoCols = {
  reasons: 'Reasons we can share your personal information',
  share: 'Does Sunrise Banks, N.A. Share?',
  limit: 'Can you limit this sharing?',
}

const infoRows = [{
  reasons: `<p><b>For our everyday business purposes –</b></p>
            <p>such as: to process your transaction, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus.</p>`,
  share: 'Yes',
  limit: 'No',
}, {
  reasons: `<p><b>For our marketing purposes –</b></p>
            <p>to offer our products and services to you.</p>`,
  share: 'Yes',
  limit: 'No',
}, {
  reasons: '<p><b>For joint marketing with other financial companies.</b></p>',
  share: 'Yes',
  limit: 'No',
}, {
  reasons: `<p><b>For our affiliates’ everyday business purposes –</b></p>
            <p>information about your transactions and experiences.</p>`,
  share: 'Yes',
  limit: 'No',
}, {
  reasons: `<p><b>For our affiliates’ everyday business purposes-</b></p>
            <p>information about your creditworthiness.</p>`,
  share: 'No',
  limit: 'We don’t share',
}, {
  reasons: '<p><b>For our affiliates to market to you.</b></p>',
  share: 'No',
  limit: 'We don’t share',
}, {
  reasons: '<p><b>For non affiliates to market to you.</b></p>',
  share: 'No',
  limit: 'We don’t share',
}]

const renderTable = (cols, rows, cnt) => (
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
                colSpan={cnt}
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
)

const renderContent = (content) => {
  const mappedContent = content.map(contentItem => (
    <p
      key={contentItem.slice(0, 8)}
      className={styles.contentItem}
      dangerouslySetInnerHTML={{ __html: contentItem }}
    />
  ))

  return (
    <Row>
      <div className={classNames(styles.content)}>{mappedContent}</div>
    </Row>
  )
}

// eslint-disable-next-line
const CardholderAgreement = () => (
  <div className={classNames(styles.CardholderAgreement)} id='card-fees'>
    <p><b>List of all fees for Credit Academy Prepaid Mastercard®</b></p>
    { renderTable(feeCols, feeRows, 4) }
    <Row>
      <div className={styles.panel}>
        {helpText[0].title}
      </div>
    </Row>
    { renderContent(helpText[0].content) }
    { renderTable(limitCols, limitRows, 2) }
    { renderContent(helpText[1].content) }
    <Row className={classNames(styles.infoRow, { [styles.first]: true })}>
      <Col md='2' className={classNames(styles.key, { [styles.fact]: true })}>FACTS</Col>
      <Col md='10' className={classNames(styles.value, { [styles.fact]: true })}>
        <b>What does Sunrise Banks, N.A. do with your Personal Information?</b>
      </Col>
    </Row>
    <Row className={classNames(styles.infoRow)}>
      <Col md='2' className={classNames(styles.key)}>Why?</Col>
      <Col md='10' className={classNames(styles.value)}>
        <p>
          {`Financial Companies choose how they share your personal information. Federal
          law gives consumers the right to limit some but not all sharing.  Federal law
          also requires us to tell you how we collect, share and protect your personal
          information.  Please read this notice carefully to understand what we do.`}
        </p>
      </Col>
    </Row>
    <Row className={classNames(styles.infoRow)}>
      <Col md='2' className={classNames(styles.key)}>What?</Col>
      <Col md='10' className={classNames(styles.value)}>
        <p>
          {`The types of personal information that we collect and share depend on
          the product or service you have with us.  This can include:`}
        </p>
        <ul>
          <li><p>Social Security Number and Date of Birth</p></li>
          <li><p>Address of Residence and Government Issued Identification</p></li>
          <li><p>Transaction History</p></li>
        </ul>
        <p>
          {`When you are no longer our customer, we continue to share your
          information as described in this notice.`}
        </p>
      </Col>
    </Row>
    <Row className={classNames(styles.infoRow)}>
      <Col md='2' className={classNames(styles.key)}>How?</Col>
      <Col md='10' className={classNames(styles.value)}>
        <p>
          {`All Financial Companies need to share customers’ personal information to
          run their everyday business.  In the section below, we list the reasons
          Financial Companies can share their customers’ personal information; the
          reasons Sunrise Banks, N.A. chooses to share; and whether you can limit the
          sharing.`}
        </p>
      </Col>
    </Row>
    { renderTable(infoCols, infoRows, 3) }
    <Row className={classNames(styles.infoRow)}>
      <Col md='2' className={classNames(styles.key)}>Questions?</Col>
      <Col md='10' className={classNames(styles.value)}>
        <p>Call 1-855-925-4626</p>
      </Col>
    </Row>
    <table className={styles.feeTable}>
      <tbody>
        <tr>
          <td colSpan='2' className={styles.pageHeader}>Who we are</td>
        </tr>
        <tr>
          <td className={styles.pageContent}><b>Who is providing this notice?</b></td>
          <td className={styles.pageContent}><b>Sunrise Banks, N.A.</b></td>
        </tr>
      </tbody>
    </table>
    <table className={styles.feeTable}>
      <tbody>
        <tr>
          <td colSpan='2' className={styles.pageHeader}>What we do</td>
        </tr>
        <tr>
          <td className={styles.pageContent}>
            <b>How does Sunrise Banks, N.A. protect my personal information?</b>
          </td>
          <td className={styles.pageContent}>
            To protect your personal information from unauthorized access and use, we use security
            measures that comply with federal law. These measures include computer safeguards and
            secured files and buildings.
          </td>
        </tr>
        <tr>
          <td className={styles.pageContent}>
            <b>How does Sunrise Banks, N.A. collect my personal information?</b>
          </td>
          <td className={styles.pageContent}>
            We collect personal information, for example, when you
            <ul>
              <li>Open a Card Account or use your card</li>
              <li>Pay your bills or make a purchase</li>
              <li>Give us your contact information</li>
            </ul>
            We also collect your personal information from others, such as credit bureaus,
            affiliates, or other companies.
          </td>
        </tr>
        <tr>
          <td className={styles.pageContent}><b>Why can’t I limit all sharing?</b></td>
          <td className={styles.pageContent}>
            Federal law gives you the right to limit only:
            <ul>
              <li>
                Sharing for affiliates everyday business purposes- information about your
                creditworthiness,
              </li>
              <li>Affiliates from using your information to market to you,</li>
              <li>Sharing for non affiliates to market to you.</li>
            </ul>
            State laws and individual companies may give you additional rights to limit sharing.
          </td>
        </tr>
      </tbody>
    </table>
    <table className={styles.feeTable}>
      <tbody>
        <tr>
          <td colSpan='2' className={styles.pageHeader}>Definitions</td>
        </tr>
        <tr>
          <td className={styles.pageContent}><b>Affiliates</b></td>
          <td className={styles.pageContent}>
            Companies related by common ownership or control. They can be financial and
            nonfinancial companies.
            <ul>
              <li>
                Our affiliates include financial companies such as University FinancialCorp. dba
                Sunrise Banks.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td className={styles.pageContent}><b>Non affiliates</b></td>
          <td className={styles.pageContent}>
            Companies not related by common ownership or control. They can be financial or
            nonfinancial companies.
            <ul>
              <li>
                Sunrise Banks, N.A. does not share with nonaffiliates so they can market to you.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td className={styles.pageContent}><b>Joint Marketing</b></td>
          <td className={styles.pageContent}>
            A formal agreement between non affiliated financial companies that together market
            financial products or services to you.
            <ul>
              <li>Our joint marketing partners include prepaid card companies.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default CardholderAgreement
