/* eslint-disable react/no-danger */
import React from 'react'

import Aux from 'components/Hoc/Aux/Aux'
import Accordion from 'components/Core/Accordion/Accordion'
import Section from 'components/Core/Section/Section'
import helpText from './privacyText'
import styles from './Privacy.scss'

const Privacy = () => (
  <Aux>
    <Section className={styles.PrivacyContent}>
      <h1>Privacy Statement for Credit Academy</h1>
      { helpText.map(topic => (
        <Accordion
          key={topic.question}
          panel={topic.question}
          content={topic.answer}
        />
      ))}
    </Section>
  </Aux>
)

export default Privacy
