import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import Aux from 'components/Hoc/Aux/Aux'
import withResponsive from 'components/Hoc/Responsive/Responsive'

import Section, { Row, Col } from 'components/Core/Section/Section'
import styles from './Footer.scss'


const Footer = ({ isMobile }) => {
  const desktopFooter = (
    <Aux>
      <Col md='12' className={styles.center}>
        <span className={styles.postFooter}>
          &copy; 2019 Credit Academy, a Greenhorn Company. Patent Pending.
        </span>
        <NavLink to='/privacy'>Credit Academy Privacy</NavLink>
        <NavLink to='/bankprivacy'>Sunrise Bank Privacy</NavLink>
        <NavLink to='/cardholderagreement'>Cardholder Agreement</NavLink>
        <NavLink to='/fees'>Fees</NavLink>
      </Col>
    </Aux>
  )

  return (
    <Section className={classNames(styles.Footer, { [styles.mobile]: isMobile })} background='#5d6b81'>
      <Row>
        <Col md='12' className={styles.center}>
          <p className={styles.preFooter}>
            This card is issued by Sunrise Banks N.A., Member FDIC, pursuant to a license
            from Mastercard International Incorporated.<br />Mastercard is a registered
            trademark, and the circles design is a trademark of Mastercard International
            Incorporated. Use of this card constitutes acceptance of the terms and
            conditions stated in the Cardholder Agreement. The card may be used everywhere
            Debit Mastercard is accepted.
          </p>
        </Col>
      </Row>
      <Row className={styles.sitemap}>
        <Col md='12'>
          <Row>
            <Col md='6'>
              <NavLink to='/sign-in'>Login</NavLink>
              <p>
                Login to Credit Academy account.
              </p>
            </Col>
            <Col md='6'>
              <NavLink to='/sign-up'>Sign Up</NavLink>
              <p>
                Open a parent account, today!
              </p>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <NavLink to='/our-story'>Our Story</NavLink>
              <p>
                Once upon a time, a young couple had a boy named Marc.
              </p>
            </Col>
            <Col md='6'>
              <NavLink to='/chore-money'>Chore Money</NavLink>
              <p>
                Create chores. Select rates. Pay only when chores are done.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <NavLink to='/score-emojis'>Score Emojis</NavLink>
              <p>
                {'We measure how wisely teens use a Credit Academy Mastercard and score them with emojis.'}
              </p>
            </Col>
            <Col md='6'>
              <NavLink to='/program'>Credit Academy Mastercard®</NavLink>
              <p>
                The first card that actually encourages teens to do chores to pay for purchases.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <NavLink to='/fees'>Fees</NavLink>
              <p>
                Credit Academy charges a monthly parental $9.95 subscription fee.
              </p>
            </Col>
            <Col md='6'>
              <NavLink to='/contact-us'>Contact Us</NavLink>
              <p>
                Contact us, and we’ll respond within 24 hours.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        { desktopFooter }
      </Row>
    </Section>
  )
}

Footer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default withResponsive(Footer)
