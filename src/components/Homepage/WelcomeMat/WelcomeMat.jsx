/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'

import PropTypes from 'prop-types'
import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import mockupImage from 'assets/images/homepage/mockup_2.png'
import styles from './WelcomeMat.scss'

const WelcomeMat = ({ handlePageChange }) => (
  <div className={styles.WelcomeMat} >
    <Section className={styles.section}>
      <Row>
        <Col md='12' lg='12' xl='12' align='center'>
          <h1>Drop the mop.</h1>
          <p>
            Credit Academy Prepaid Mastercard
            <sup>®</sup>
            {' allows \n teens to pay for purchases with chores.'}
          </p>
          <Button
            className={styles.button}
            textOnly
            text='Our story >'
            onClick={() => handlePageChange()}
          />
          <div className={styles.mockup} style={{ backgroundImage: `url(${mockupImage})` }} />
        </Col>
      </Row>
    </Section>
  </div>
)

WelcomeMat.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
}

export default withResponsive(WelcomeMat)
