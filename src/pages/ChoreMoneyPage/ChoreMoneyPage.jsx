import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import WelcomePiggy from 'components/Homepage/WelcomePiggy/WelcomePiggy'
import Footer from 'containers/Footer/Footer'
import Navbar from 'containers/Navbar/Navbar'
import styles from './ChoreMoneyPage.scss'


const ChoreMoneyPage = () => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.ChoreMoneyPage}>
        <Row>
          <Col md='12' >
            <WelcomePiggy textType={1} />
          </Col>
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default ChoreMoneyPage
