import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Core/Button/Button'
// import classNames from 'classnames'
import styles from './Statements.scss'

const Statements = ({ statements, downloadStatements }) => {
  const monthObj = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  return (
    <div className={styles.statements}>
      {statements.map((item, index) => {
        const year = item.substr(0, 4)
        const month = item.substr(4)
        const lastYear = index > 0 ? statements[index - 1].substr(0, 4) : null
        return (
          <div key={item}>
            { year !== lastYear &&
              <p className={styles.year}>{year}</p>
            }
            <div className={styles.rowWrapper}>
              <p>{monthObj[month]}</p>
              <Button
                className={styles.button}
                onClick={() => downloadStatements(item)}
                text='Download'
                textOnly
              />
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

Statements.propTypes = {
  statements: PropTypes.array,
  downloadStatements: PropTypes.func.isRequired,
}

Statements.defaultProps = {
  statements: [],
}

export default Statements
