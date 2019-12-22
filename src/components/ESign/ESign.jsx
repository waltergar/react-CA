import React from 'react'

import Aux from 'components/Hoc/Aux/Aux'
import Accordion from 'components/Core/Accordion/Accordion'
import Section from 'components/Core/Section/Section'
import helpText from './esignText'
import styles from './ESign.scss'


const ESign = () => (
  <Aux>
    <Section className={styles.DashboardContent}>
      <h1>E-Sign Disclosure</h1>
      { helpText.map(topic => (
        <Accordion
          key='E-Sign Disclosure'
          panel={topic.question}
          content={topic.answer}
          open={topic.open ? topic.open : false}
        />
      ))}
    </Section>
  </Aux>
)

export default ESign
