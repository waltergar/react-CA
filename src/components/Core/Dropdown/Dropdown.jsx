import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgInline from 'react-svg-inline'

import styles from './Dropdown.scss'

class Dropdown extends Component {
  state = {
    inFocus: false,
    isValid: false,
    value: '',
  }

  componentDidMount() {
    const { defaultValue } = this.props

    if (defaultValue) {
      // eslint-disable-next-line
      this.setState(
        prevState => ({ ...prevState, value: defaultValue }),
        () => this.handleValidation(),
      )
    }
  }

  handleValidation = () => {
    const { isRequired, isValid } = this.props
    const { value } = this.state
    if (isRequired && value.length === 0) {
      this.setState(ps => ({ ...ps, isValid: false }), () => isValid && isValid(this.state.isValid))
      return
    }

    if (isRequired && value.length > 0) {
      this.setState(ps => ({ ...ps, isValid: true }), () => isValid && isValid(this.state.isValid))
      return
    }

    if (!isRequired) {
      this.setState(ps => ({ ...ps, isValid: true }), () => isValid && isValid(this.state.isValid))
    }
  }

  handleOnFocus = () => {
    this.setState(
      () => ({ inFocus: true }),
      () => this.props.onFocus,
    )
  }

  handleOnBlur = () => {
    this.setState(() => ({ inFocus: false }))
  }

  handleValueChangeWrapper = (event) => {
    const { handleValueChange, isValid } = this.props
    const { target: { value } } = event
    this.setState(prevState => ({ ...prevState, value }), () => {
      if (handleValueChange) handleValueChange(this.state.value)
      if (isValid) this.handleValidation()
    })
  }

  render() {
    const {
      placeholder,
      icon,
      isTransparent,
      className,
      options,
    } = this.props

    const { inFocus } = this.state

    return (
      <div
        className={classNames(
          styles.Dropdown,
          { [styles.isTransparent]: isTransparent && !inFocus },
          className,
        )}
      >
        { icon && <SvgInline svg={icon} className={styles.inputIcon} /> }
        <select
          placeholder={placeholder}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          value={this.state.value}
          onChange={this.handleValueChangeWrapper}
        >
          <option value=''>{ placeholder || 'Select Card' }</option>
          { options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  isTransparent: PropTypes.bool,
  options: PropTypes.array,
  handleValueChange: PropTypes.func,
  defaultValue: PropTypes.string,
  isRequired: PropTypes.bool,
  isValid: PropTypes.func,
}

Dropdown.defaultProps = {
  onFocus: null,
  className: '',
  icon: null,
  isTransparent: false,
  handleValueChange: null,
  options: [],
  defaultValue: null,
  isRequired: false,
  isValid: false,
}

export default Dropdown
