import React from 'react'

import Navbar from 'containers/Navbar/Navbar'
import Aux from 'components/Hoc/Aux/Aux'
import Section, { Row } from 'components/Core/Section/Section'
import Terms from 'components/Terms/Terms'
import styles from './TermsPage.scss'


const TermsPage = () => (
  <div className={styles.TermsPage}>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.ContentPage}>
        <Row>
          <h1 className={styles.header}>
            Terms
          </h1>
        </Row>
        <Terms />
      </Section>
    </Aux>
  </div>
)


export default TermsPage
