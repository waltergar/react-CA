import React from 'react'

import Aux from 'components/Hoc/Aux/Aux'
import Accordion from 'components/Core/Accordion/Accordion'
import Section from 'components/Core/Section/Section'
import helpText from './helpText'
import styles from './Help.scss'


const Help = () => (
  <Aux>
    <Section className={styles.DashboardHeader}>
      <h1>Help</h1>
    </Section>
    <Section className={styles.DashboardContent}>
      { helpText.map(topic => <Accordion panel={topic.question} content={topic.answer} />) }
    </Section>
  </Aux>
)

export default Help
