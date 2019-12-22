import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Row } from 'components/Core/Section/Section'
import Chore from './Items/Chore'
import Transaction from './Items/Transaction'
import styles from './InfoRow.scss'


const InfoRow = ({ children, className }) => (
  <div className={classNames(styles.InfoRow, className)}>
    <Row>{ children }</Row>
  </div>
)

InfoRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
InfoRow.defaultProps = {
  className: '',
}

InfoRow.Chore = Chore
InfoRow.Transaction = Transaction

export default InfoRow
