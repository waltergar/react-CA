import React from 'react'
import SvgInline from 'react-svg-inline'

import logo from 'assets/images/logo/pinkFilledLogo.svg'
import styles from './Loading.scss'

// eslint-disable-next-line
const Loading = () => (
  <div className={styles.Loading}>
    <div className={styles.spinnerBox}>
      <div className={styles.circleBorder}>
        <div className={styles.circleCore} />
      </div>
    </div>
    <div className={styles.logo}>
      <SvgInline
        className={styles.logoIcon}
        svg={logo}
      />
    </div>
  </div>
)

export default Loading
