import React from 'react'
import PropTypes from 'prop-types'

import Aux from 'components/Hoc/Aux/Aux'
import NavBar from 'containers/Navbar/Navbar'
import Section, { Row } from 'components/Core/Section/Section'
import styles from './ContentPage.scss'


const ContentPage = ({ blue, title, children }) => (
  <Aux>
    <NavBar />
    <Section className={styles.ContentPage} background={blue ? '#5d6b81' : '#ffffff'}>
      <Row>
        <h1 className={styles.header}>
          {title}
        </h1>
      </Row>
      {children}
    </Section>
  </Aux>
)

ContentPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  blue: PropTypes.bool,
}

ContentPage.defaultProps = {
  children: null,
  blue: false,
}

export default ContentPage
