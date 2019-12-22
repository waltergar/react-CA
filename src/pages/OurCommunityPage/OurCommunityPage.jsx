import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import CreditAcademyCommunity from 'components/Homepage/CreditAcademyCommunity/CreditAcademyCommunity'
import Footer from 'containers/Footer/Footer'
import Navbar from 'containers/Navbar/Navbar'
import styles from './OurCommunityPage.scss'


const OurCommunityPage = () => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.OurCommunityPage}>
        <Row>
          <h1 className={styles.header}>
            Our Community
          </h1>
        </Row>
        <Row>
          <Col md='1' />
          <Col md='10' >
            <CreditAcademyCommunity />
          </Col>
          <Col md='1' />
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default OurCommunityPage
