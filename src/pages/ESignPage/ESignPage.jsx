import React from 'react'

import Navbar from 'containers/Navbar/Navbar'
import ESign from 'components/ESign/ESign'
import Footer from 'containers/Footer/Footer'

import styles from './ESignPage.scss'

const ESignPage = () => (
  <div className={styles.ESignPage}>
    <Navbar overrideTransparency />
    <ESign />
    <Footer />
  </div>
)

export default ESignPage
