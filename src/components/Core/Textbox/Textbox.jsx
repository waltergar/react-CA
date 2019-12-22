import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgInline from 'react-svg-inline'
import InputMask from 'react-input-mask'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

import Button from 'components/Core/Button/Button'
import { log } from 'utils/log'
import styles from './Textbox.scss'

class Textbox extends Component {
  state = {
    inFocus: false,
    value: '',
    error: {
      level: null,
      message: 'Your input is too small',
    },
    pristine: true,
  }

  componentDidMount() {
    const { defaultValue, validators, optional, isValid } = this.props

    if (defaultValue) {
      // eslint-disable-next-line
      this.setState(
        prevState => ({ ...prevState, value: defaultValue }),
        () => this.handleValidation(validators),
      )
    }

    if (optional && this.state.pristine) {
      if (isValid) isValid(true)
    }
  }

  componentDidUpdate() {
    const { optional, isValid } = this.props
    if (optional && this.state.pristine) {
      if (isValid) isValid(true)
    }
  }

  handleOnFocus = () => {
    this.setState(
      () => ({ inFocus: true }),
      () => this.props.onFocus && this.props.onFocus(),
    )
  }

  handleOnBlur = () => {
    this.setState(
      () => ({ inFocus: false }),
      () => this.props.onBlur && this.props.onBlur(),
    )
  }

  handleValueChangeWrapper = (event) => {
    const { handleValueChange, validators } = this.props
    const { target: { value } } = event
    this.setState(prevState => ({ ...prevState, value }), () => {
      if (handleValueChange) handleValueChange(this.state.value)
      if (validators) this.handleValidation(validators)
    })
  }

  handleSetErrorState = errorState => (
    this.setState(prevState => ({
      ...prevState,
      error: prevState.error.level <= errorState.level
        ? { ...errorState }
        : { ...prevState.error },
    }))
  )

  handleSetCleanState = () => {
    const { handleCleanState } = this.props
    this.setState(prevState => ({
      ...prevState,
      error: { level: null, message: '' },
    }), () => {
      handleCleanState()
    })
  }

  handleAddressChange = (value) => {
    this.setState(prevState => ({ ...prevState, value }))
  }

  handleAddressSelect = (value) => {
    const { handleValueChange, validators } = this.props
    geocodeByAddress(value)
      .then((results) => {
        this.setState(prevState => ({ ...prevState, value: results[0].formatted_address }), () => {
          if (handleValueChange) handleValueChange(this.state.value)
          if (validators) this.handleValidation(validators)
        })
      })
      .catch(error => log.error(error))
  }

  handleValidation = (validators) => {
    const { value } = this.state
    const errors = validators.filter((validator) => {
      // Test any and all validators present. Highest error levels take precedence.
      // Use regex Validator if present and test for failure.
      if (validator.regex && !RegExp(validator.regex).test(value)) return true

      // Use minLength validator if present and test for failure.
      if (validator.minLength && validator.minLength > value.length) return true

      // Use maxLength validator if present and test for failure.
      if (validator.maxLength && validator.maxLength < value.length) return true

      // Use integer minValue validator if present and test for failure.
      if (validator.minValue && validator.minValue > Number.parseFloat(value)) return true

      // Use a passed in boolean case to derive error (ie. { case: password === verifiedPassword })
      if ('case' in validator) {
        if (!validator.case) return true
      }

      // Use integer mandatoryCharactor validator if present and test for minimum index position.
      if (
        validator.mandatoryCharacter
        && validator.minPosition
        && value.indexOf(validator.mandatoryCharacter) < validator.minPosition
      ) return true

      // Use limits if preset and test for failure.
      if (
        validator.limit
        && validator.limitCharacter
        && value.split(validator.limitCharacter).length - 1 > validator.limit
      ) return true

      return false
    })

    // If errors, clean up the errors into a readable shape and set the state.
    if (errors.length > 0) {
      const cleanedErrors = errors.reduce((errorObject, validator) => {
        const { error: { level: incomingLevel, message: incomingMessage } } = validator
        return {
          level: errorObject.level > incomingLevel ? errorObject.level : incomingLevel,
          message: errorObject.message && errorObject.message.length > 0 ? `${errorObject.message} ${incomingMessage}` : incomingMessage,
        }
      }, {})

      if (value.length > 0) {
        this.handleSetErrorState(cleanedErrors)
        this.setState(ps => ({ ...ps, pristine: false }))
        if (this.props.isValid) this.props.isValid(false)
      }

      if (value.length === 0 && !this.props.optional) {
        this.handleSetErrorState(cleanedErrors)
        this.setState(ps => ({ ...ps, pristine: false }))
        if (this.props.isValid) this.props.isValid(false)
      }

      if (value.length === 0 && this.props.optional) {
        this.handleSetCleanState()
        if (this.props.isValid) this.props.isValid(true)
        this.setState(ps => ({ ...ps, pristine: true }))
      }
    }

    // If no errors anymore and error was previously set, wipe it.
    if (errors.length === 0) {
      this.handleSetCleanState()
      this.setState(ps => ({ ...ps, pristine: true }))
      if (this.props.isValid) this.props.isValid(true)
    }

    if (value.length === 0 && this.props.optional && this.state.pristine) {
      if (this.props.isValid) this.props.isValid(true)
    }
  }

  renderInputMask = () => (
    <InputMask
      mask={this.props.mask}
      placeholder={this.props.placeholder}
      onFocus={this.handleOnFocus}
      onBlur={this.handleOnBlur}
      value={this.state.value}
      onChange={this.handleValueChangeWrapper}
      disabled={this.props.disabled}
    />
  )

  renderInput = isAddress => (
    isAddress ?
      <PlacesAutocomplete
        value={this.state.value}
        onChange={this.handleAddressChange}
        onSelect={this.handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.addressField}>
            <input
              {...getInputProps({
                placeholder: 'Search Address ...',
                className: 'location-search-input',
              })}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
              onClick={this.handleOnFocus}
            />
            {this.state.inFocus &&
            <div className={styles.autocompleteDropdownContainer}>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = classNames(styles.suggestionItem, {
                  [styles.isActive]: suggestion.active,
                })
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>}
          </div>
        )}
      </PlacesAutocomplete>
      :
      <input
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        type={this.props.password ? 'password' : 'text'}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        value={this.state.value}
        onChange={this.handleValueChangeWrapper}
        onClick={this.handleOnFocus}
      />
  )

  renderErrorMessage = () => {
    const { incomingError } = this.props
    const { error: { level: errorLevel, message: errorMessage } } = this.state

    if (incomingError) return (<div className={styles.error}>{incomingError}</div>)
    if (errorLevel && errorMessage) return (<div className={styles.error}>{errorMessage}</div>)
    return null
  }

  render() {
    const {
      icon,
      buttonText,
      buttonIcon,
      buttonAction,
      isButtonEnable,
      className,
      password,
      mask,
      isAddress,
      isTransparent,
      disabled,
      textboxName,
      iconOnly,
      isProfile,
    } = this.props

    const { inFocus } = this.state
    const renderedInput = (mask && !password ? this.renderInputMask() : this.renderInput(isAddress))
    return (
      <div className={
        classNames(
          styles.Textbox,
          { [styles.hasButton]: buttonText && buttonAction },
          { [styles.isTransparent]: isTransparent && !inFocus },
          { [styles.disabled]: disabled },
          { [styles.isProfile]: isProfile },
          className,
        )}
      >
        { icon && <SvgInline svg={icon} className={styles.inputIcon} /> }
        { isProfile ?
          <div className={styles.inputNameBox}>
            { textboxName && !disabled &&
              <span className={
                classNames(
                  styles.textboxName,
                  { [styles.hasIconTextboxName]: icon },
                )}
              >
                {textboxName}
              </span>
            }
            { renderedInput }
          </div>
        :
          renderedInput
        }
        {
          buttonText && buttonAction && !disabled
          &&
          <Button
            onClick={buttonAction}
            icon={buttonIcon}
            text={buttonText}
            disabled={!isButtonEnable}
            iconOnly={iconOnly}
            primary
          />
        }
        { this.renderErrorMessage() }
      </div>
    )
  }
}

Textbox.propTypes = {
  textboxName: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  isAddress: PropTypes.bool,
  isTransparent: PropTypes.bool,
  password: PropTypes.bool,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  iconOnly: PropTypes.bool,

  buttonText: PropTypes.string,
  buttonIcon: PropTypes.node,
  buttonAction: PropTypes.func,
  isButtonEnable: PropTypes.bool,
  handleValueChange: PropTypes.func,
  handleCleanState: PropTypes.func,
  mask: PropTypes.string,
  validators: PropTypes.arrayOf(PropTypes.object),
  isValid: PropTypes.func,
  incomingError: PropTypes.string,
  isProfile: PropTypes.bool,
}

Textbox.defaultProps = {
  textboxName: null,
  disabled: false,
  optional: false,
  onFocus: null,
  onBlur: null,
  className: '',
  icon: null,
  buttonText: null,
  buttonIcon: null,
  buttonAction: null,
  isButtonEnable: null,
  isAddress: false,
  isTransparent: false,
  handleValueChange: null,
  handleCleanState: () => {},
  password: false,
  mask: null,
  defaultValue: null,
  validators: [{}],
  isValid: null,
  iconOnly: false,
  incomingError: '',
  isProfile: false,
}


export default Textbox
