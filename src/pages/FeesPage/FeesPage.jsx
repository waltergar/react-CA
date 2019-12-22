import React from 'react'
import PropTypes from 'prop-types'

import Navbar from 'containers/Navbar/Navbar'
import Aux from 'components/Hoc/Aux/Aux'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Section, { Row } from 'components/Core/Section/Section'
import Program from 'components/Program/Program'
import Footer from 'containers/Footer/Footer'

import styles from './FeesPage.scss'

const FeesPage = ({ isMobile }) => (
  <div>
    <Navbar overrideTransparency />
    <Aux>
      <Section className={styles.FeesPage}>
        <Row>
          <h1 className={styles.header}>
            Fees
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

FeesPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default withResponsive(FeesPage)
