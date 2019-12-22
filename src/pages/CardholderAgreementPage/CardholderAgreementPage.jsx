import React from 'react'

import Navbar from 'containers/Navbar/Navbar'
import Aux from 'components/Hoc/Aux/Aux'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Section, { Row } from 'components/Core/Section/Section'
import CardholderAgreement from 'components/CardholderAgreement/CardholderAgreement'
import Footer from 'containers/Footer/Footer'

import styles from './CardholderAgreementPage.scss'

const CardholderAgreementPage = () => (
  <div className={styles.CardholderAgreementPage}>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.ContentPage}>
        <Row>
          <h1 className={styles.header}>
            Cardholder Agreement
          </h1>
        </Row>
        <Row>
          <CardholderAgreement />
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default withResponsive(CardholderAgreementPage)
