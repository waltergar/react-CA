import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import Faqs from 'components/Faqs/Faqs'
import Footer from 'containers/Footer/Footer'
import Navbar from 'containers/Navbar/Navbar'
import styles from './FaqPage.scss'


const FaqPage = () => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.FaqPage}>
        <Row>
          <h1 className={styles.header}>
            FAQs
          </h1>
        </Row>
        <Row>
          <Col md='1' />
          <Col md='10' >
            <Faqs />
          </Col>
          <Col md='1' />
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default FaqPage
