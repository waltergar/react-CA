import React from 'react'

import Navbar from 'containers/Navbar/Navbar'
import Privacy from 'components/Privacy/Privacy'
import Footer from 'containers/Footer/Footer'

import styles from './PrivacyPage.scss'

const PrivacyPage = () => (
  <div className={styles.PrivacyPage}>
    <Navbar overrideTransparency />
    <Privacy />
    <Footer />
  </div>
)

export default PrivacyPage
