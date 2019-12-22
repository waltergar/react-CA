import React from 'react'

import Accordion from 'components/Core/Accordion/Accordion'
import helpText from './termsText'


const Terms = () => (
  helpText.map(topic => (
    <Accordion
      key={topic.question}
      panel={topic.question}
      content={topic.answer}
      open={topic.open ? topic.open : false}
    />
  ))
)

export default Terms
