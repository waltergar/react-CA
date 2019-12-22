/* eslint-disable react/no-danger */
import React from 'react'
import classNames from 'classnames'

import Aux from 'components/Hoc/Aux/Aux'
import Section, { Row, Col } from 'components/Core/Section/Section'
import styles from './BankPrivacy.scss'

const cols = {
  reasons: 'Reasons we can share your personal information',
  share: 'Does Sunrise Banks, N.A. Share?',
  limit: 'Can you limit this sharing?',
}

const rows = [{
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

const BankPrivacy = () => (
  <Aux>
    <Section className={styles.PrivacyContent}>
      <h1>Sunrise Banks Privacy Policy 2018</h1>
      <div className={styles.bankPolicy}>
        <Row>
          <Col md='2' className={classNames(styles.key, { [styles.fact]: true })}>FACTS</Col>
          <Col md='10' className={classNames(styles.value, { [styles.fact]: true })}>
            What does Sunrise Banks, N.A. do with your Personal Information?
          </Col>
        </Row>
        <Row>
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
        <Row>
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
        <Row>
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
        <table className={styles.reasonTable}>
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
                  {
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
        <Row>
          <Col md='2' className={classNames(styles.key)}>Questions?</Col>
          <Col md='10' className={classNames(styles.value)}>
            <p>Call 1-855-925-4626</p>
          </Col>
        </Row>
      </div>
    </Section>
  </Aux>
)

export default BankPrivacy
