/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import ourMissionImage from 'assets/images/homepage/girlOurMission.jpg'
import styles from './OurMission.scss'


const OurMission = ({ signupActive, pageNav }) => (
  <div className={styles.OurMission}>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(${ourMissionImage})` }}
    />
    <Section className={styles.section}>
      <Row>
        <Col md='12'>
          <h1>Our mission is to educate teens on how to use credit wisely.</h1>
          <NavLink to={signupActive ? '/sign-up' : '/subscribe'}>
            <Button className={styles.button} nocaps primary text={signupActive ? 'Sign Up' : 'Join waitlist'} />
          </NavLink>
          {pageNav}
        </Col>
      </Row>
    </Section>
  </div>
)

OurMission.propTypes = {
  signupActive: PropTypes.bool.isRequired,
  pageNav: PropTypes.node.isRequired,
}

export default OurMission
