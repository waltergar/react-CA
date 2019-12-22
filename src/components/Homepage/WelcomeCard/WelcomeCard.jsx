/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'

import { Col } from 'components/Core/Section/Section'
// import cardImage from 'assets/images/cc.png'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import styles from './WelcomeCard.scss'

const webStr = 'The first card that actually \n encourages teens to do \n chores to pay for purchases.'
const mobileStr = 'The first card \n that actually \n encourages \n teens to do \n chores to pay \n for purchases.'
const WelcomeCard = ({ isMobile }) => (
  <div className={styles.WelcomeMat}>
    <div className={styles.section} >
      <div className={styles.wrapper}>
        <Col md='12' sm='12' xs='12' lg='12' className={styles.childWrapper} >
          <p>
            {isMobile ? mobileStr : webStr}
          </p>
        </Col>
      </div>
    </div>
  </div>
)

WelcomeCard.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}
export default withResponsive(WelcomeCard)
