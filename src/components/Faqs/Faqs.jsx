import React from 'react'

import Aux from 'components/Hoc/Aux/Aux'
import Accordion from 'components/Core/Accordion/Accordion'
import Section from 'components/Core/Section/Section'
import helpText from './helpText'
import styles from './Faqs.scss'


const Faqs = () => (
  <Aux>
    <Section className={styles.FaqsContent}>
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

export default Faqs
