import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Section from 'components/Core/Section/Section'
import styles from './Content.scss'


const Content = ({ children, isHeader, className }) => (
  <Section className={classNames(isHeader ? styles.DashboardHeader : styles.DashboardContent, className)}>
    {children}
  </Section>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
  isHeader: PropTypes.bool,
  className: PropTypes.string,
}

Content.defaultProps = {
  isHeader: false,
  className: '',
}


export default Content
