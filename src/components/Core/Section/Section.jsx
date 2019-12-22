import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container as ContainerReal, Row as RowReal, Col as ColReal } from 'muicss/react'

import styles from './Section.scss'

const Section = ({
  fluid,
  nomargin,
  className,
  singleColumn,
  children,
  background,
  rounded,
  onClick,
  containerRealStyle,
}) => (
  // eslint-disable-next-line
  <section
    className={classNames(styles.Section, { [styles.rounded]: rounded }, className)}
    style={{ backgroundColor: background || 'none' }}
    onClick={onClick}
  >
    <ContainerReal fluid={fluid} style={{ marginLeft: nomargin ? 20 : 'auto', ...containerRealStyle }}>
      { singleColumn && <RowReal><ColReal md="12">{children}</ColReal></RowReal> }
      { !singleColumn && children}
    </ContainerReal>
  </section>
)

Section.propTypes = {
  fluid: PropTypes.bool,
  nomargin: PropTypes.bool,
  className: PropTypes.string,
  singleColumn: PropTypes.bool,
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  containerRealStyle: PropTypes.object,
}

Section.defaultProps = {
  fluid: false,
  nomargin: false,
  className: '',
  singleColumn: false,
  background: '',
  rounded: false,
  onClick: null,
  containerRealStyle: {},
}

export const Container = ContainerReal
export const Row = RowReal
export const Col = ColReal

export default Section
