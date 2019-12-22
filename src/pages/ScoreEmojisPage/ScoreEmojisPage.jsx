import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import WelcomePiggy from 'components/Homepage/WelcomePiggy/WelcomePiggy'
import Footer from 'containers/Footer/Footer'
import Navbar from 'containers/Navbar/Navbar'
import styles from './ScoreEmojisPage.scss'


const ScoreEmojisPage = () => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.ScoreEmojisPage}>
        <Row>
          <Col md='12' >
            <WelcomePiggy textType={4} />
          </Col>
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default ScoreEmojisPage
