import React from 'react'

import Navbar from 'containers/Navbar/Navbar'
import BankPrivacy from 'components/BankPrivacy/BankPrivacy'
import Footer from 'containers/Footer/Footer'

import styles from './BankPrivacyPage.scss'

const BankPrivacyPage = () => (
  <div className={styles.PrivacyPage}>
    <Navbar overrideTransparency />
    <BankPrivacy />
    <Footer />
  </div>
)

export default BankPrivacyPage
