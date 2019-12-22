import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import OurStory from 'components/Homepage/OurStory/OurStory'
import Footer from 'containers/Footer/Footer'
import Navbar from 'containers/Navbar/Navbar'
import styles from './OurStoryPage.scss'


const OurStoryPage = () => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.OurStoryPage}>
        <Row>
          <Col md='12' >
            <OurStory />
          </Col>
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

export default OurStoryPage
