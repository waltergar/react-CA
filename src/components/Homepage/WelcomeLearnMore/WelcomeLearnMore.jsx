/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { Col } from 'components/Core/Section/Section'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import styles from './WelcomeLearnMore.scss'

const WelcomeLearnMore = () => (
  <div className={styles.WelcomeMat} >
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <Col md='12'>
          <p>
          Once upon a time, a young couple had a boy named Marc. One day while at a shop, Marc
          asked his dad for a toy car. Dad explained he had no cash. “Use your credit card!”, said
          Marc. “How do we teach him the importance of working hard to pay for his purchases?” Dad
          wondered. “We should create an experience where he pays for purchases with chores linked
          to a card, and score him with emojis based on how wisely he uses his card to keep him
          motivated” said Mom.
          </p>
          <br />
          <p>Eureka! The Credit Academy Mastercard® was born.</p>
        </Col>
      </div>
    </div>
  </div>
)

export default withResponsive(WelcomeLearnMore)
