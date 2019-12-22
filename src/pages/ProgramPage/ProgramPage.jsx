import React from 'react'
import PropTypes from 'prop-types'

import Navbar from 'containers/Navbar/Navbar'
import Aux from 'components/Hoc/Aux/Aux'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Section, { Row } from 'components/Core/Section/Section'
import Program from 'components/Program/Program'
import Footer from 'containers/Footer/Footer'

import styles from './ProgramPage.scss'

const ProgramPage = ({ isMobile }) => (
  <div className={styles.ProgramPage}>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.ContentPage}>
        <Row>
          <h1 className={styles.header}>
            Credit Academy Prepaid Mastercard®
          </h1>
        </Row>
        <Row>
          <Program isMobile={isMobile} />
        </Row>
      </Section>
      <Footer />
    </Aux>
  </div>
)

ProgramPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default withResponsive(ProgramPage)
