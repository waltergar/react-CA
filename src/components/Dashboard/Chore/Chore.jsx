import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Core/Button/Button'
import styles from './Chore.scss'

const Chore = ({ name, value, remove, actionLabel }) => (
  <div className={styles.Chore}>
    <div className={styles.flexbox}>
      <p className={styles.name}>{name}</p>
    </div>
    <div className={styles.flexbox}>
      <p className={styles.amount}>{value}</p>
      <Button secondary className={styles.button} onClick={remove} text={actionLabel} />
    </div>
  </div>
)

Chore.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
}

export default Chore
