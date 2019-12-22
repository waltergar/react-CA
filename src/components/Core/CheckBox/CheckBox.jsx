import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './CheckBox.scss'

class CheckBox extends Component {
  state = {
    isChecked: false,
  }

  componentDidMount = () => {
    const { isChecked } = this.props

    this.setState({ isChecked })
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange } = this.props

    this.setState(
      prevState => ({ ...prevState, isChecked: !this.state.isChecked }),
      () => handleCheckboxChange(this.state.isChecked),
    )
  }

  render() {
    const {
      label,
      value,
      className,
      disabled,
    } = this.props

    const {
      isChecked,
    } = this.state

    return (
      <div className={classNames(styles.CheckBoxContainer, className)}>
        <div className={classNames(styles.CheckBoxIcon, { [styles.checked]: isChecked })}>
          <svg viewBox="0 0 24 24" onClick={this.toggleCheckboxChange}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <label htmlFor="checkbox">
          <input
            id="checkbox"
            type="checkbox"
            value={value}
            checked={isChecked}
            className={styles.CheckBox}
            disabled={disabled}
            onChange={this.toggleCheckboxChange}
          />
          {label}
        </label>
      </div>
    )
  }
}

CheckBox.propTypes = {
  label: PropTypes.object.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired,
}

CheckBox.defaultProps = {
  value: '1',
  className: '',
  disabled: false,
  isChecked: false,
}

export default CheckBox
