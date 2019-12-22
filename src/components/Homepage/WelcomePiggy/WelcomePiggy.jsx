/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
// import { NavLink } from 'react-router-dom'

import mockupImage1 from 'assets/images/homepage/mockup_1.png'
import mockupImage2 from 'assets/images/homepage/mockup_2.png'
import mockupImage3 from 'assets/images/homepage/mockup_3.png'
import mockupImage4 from 'assets/images/homepage/mockup_4.png'
import mockupImage5 from 'assets/images/homepage/mockup_5.png'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import styles from './WelcomePiggy.scss'

const textArray = [
  'Create card account. \n Fund it.',
  'Create chores. \n Select rates. \n Pay only when \n chores are done.',
  'Teens pay their \n balance by doing \n chores. When \n approved, we’ll \n load cards with \n funds, and \n reconcile their \n balance.',
  'Everything teens \n buy at a glance.',
  'We measure how \n wisely teens use \n their Credit Academy \n Mastercard and \n score them with \n emojis.',
]

const imageArray = [mockupImage5, mockupImage1, mockupImage2, mockupImage3, mockupImage4]

const WelcomeMat = ({ textType }) => (
  <div className={styles.WelcomeMat}>
    <div className={styles.section} >
      <p>{textArray[textType]}</p>
      <div className={styles.mockup} style={{ backgroundImage: `url(${imageArray[textType]})` }} />
      {/* { buttonType === 1 &&
        <NavLink to={signupActive ? '/sign-up' : '/subscribe'}>
          <Button
            className={styles.button}
            primary
            text={signupActive ? 'Sign up' : 'Join the waitlist'}
          />
        </NavLink>
      } */}
      {/* { buttonType === 2 &&
        <Button
          className={styles.button}
          textOnly
          text='Learn more >'
          onClick={() => handlePageChange()}
        />
      } */}
    </div>
  </div>
)

WelcomeMat.propTypes = {
  textType: PropTypes.number,
}

WelcomeMat.defaultProps = {
  textType: 0,
}
export default withResponsive(WelcomeMat)
