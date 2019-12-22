import React from 'react'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'

import Aux from 'components/Hoc/Aux/Aux'

import largeThinArrow from 'assets/images/global/largeThinArrow.svg'
import styles from './Instructions.scss'


const Instructions = ({ steps }) => (
  <div className={styles.Instructions}>
    {
      steps.map((step, idx) => (
        <Aux key={step.title}>
          <div className={styles.step}>
            <SvgInline svg={step.icon} />
            <h1>{step.title}</h1>
            <p>{step.content}</p>
          </div>
          { idx < steps.length - 1 && <SvgInline svg={largeThinArrow} /> }
        </Aux>
      ))
    }
  </div>
)

Instructions.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  })).isRequired,
}

export default Instructions
