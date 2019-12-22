import React from 'react'
import PropTypes from 'prop-types'

import Section from 'components/Core/Section/Section'
import Card from 'components/Core/Card/Card'
import styles from './WhyCreditAcademy.scss'


const WhyCreditAcademy = ({ title, content, hash }) => (
  <div className={styles.WhyCreditAcademy} id={hash}>
    <Section background='white' singleColumn>
      <Card className={styles.card}>
        { title && (<h1>{title}</h1>)}
        { content }
      </Card>
    </Section>
  </div>
)

WhyCreditAcademy.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  hash: PropTypes.string,
}

WhyCreditAcademy.defaultProps = {
  title: null,
  content: null,
  hash: null,
}


export default WhyCreditAcademy
