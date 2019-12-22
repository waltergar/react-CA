import React from 'react'
import SvgInline from 'react-svg-inline'

import arrowDownGrey from 'assets/images/homepage/arrowDownGrey.svg'
import styles from './GreyArrow.scss'

// eslint-disable-next-line
const GreyArrow = ({ learnMore }) => (
  <div className={learnMore && styles.learnMore}>
    { learnMore && <p>Learn More</p>}
    <SvgInline
      className={styles.GreyArrow}
      svg={arrowDownGrey}
    />
  </div>
)


export default GreyArrow
