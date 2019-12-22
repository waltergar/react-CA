import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Textbox from 'components/Core/Textbox/Textbox'
import Dropdown from 'components/Core/Dropdown/Dropdown'
import styles from './FormGroup.scss'


class FormGroup extends Component {
  state = {
    formIsValid: false,
    formFields: {},
  }

  componentDidMount() {
    const { inputs } = this.props
    const formFields = inputs
      .filter(input => input.validators && input.validators.length > 0)
      .reduce((formFieldObject, input) => ({
        ...formFieldObject, [input.id]: false,
      }), {})

    // eslint-disable-next-line
    this.setState(ps => ({ ...ps, formFields }))
  }

  handleIsValid = (id, isValid) => {
    if (this.state.formFields[id] !== isValid) {
      this.setState(
        ps => ({ ...ps, formFields: { ...ps.formFields, [id]: isValid } }),
        () => this.handleFormIsValid(),
      )
    }
  }

  handleFormIsValid = () => {
    const { isValid } = this.props
    const { formFields } = this.state
    const invalidFormElements = Object.keys(formFields).filter(input => formFields[input] === false)
    const formIsValid = invalidFormElements.length === 0

    if (formIsValid !== this.state.formIsValid) {
      this.setState(
        prevState => ({ ...prevState, formIsValid }),
        () => isValid(this.state.formIsValid),
      )
    }
  }

  renderInputs = inputs => inputs.map((input) => {
    if (input.type === 'dropdown') {
      return (
        <Dropdown
          className={styles.textbox}
          value={input.value}
          defaultValue={input.value}
          handleValueChange={input.handler}
          placeholder={input.placeholder}
          key={input.placeholder}
          icon={input.icon}
          options={input.options}
          validators={input.validators}
          isTransparent
          isRequired={input.isRequired}
          isValid={isValid => this.handleIsValid(input.id, isValid)}
        />
      )
    }

    return (
      <Textbox
        className={styles.textbox}
        value={input.value}
        defaultValue={input.value}
        placeholder={input.placeholder}
        icon={input.icon}
        handleValueChange={input.handler}
        handleCleanState={input.errorHandler}
        isTransparent
        isAddress={input.isAddress}
        validators={input.validators}
        incomingError={input.incomingError}
        mask={input.mask}
        key={input.placeholder}
        isValid={isValid => this.handleIsValid(input.id, isValid)}
        optional={input.optional}
      />
    )
  })

  render() {
    const { inputs, className } = this.props
    const formInputs = this.renderInputs(inputs)
    return (
      <div className={classNames(styles.FormGroup, className)}>
        { formInputs }
      </div>
    )
  }
}

FormGroup.propTypes = {
  inputs: PropTypes.array.isRequired,
  isValid: PropTypes.func,
  className: PropTypes.string,
}

FormGroup.defaultProps = {
  isValid: null,
  className: null,
}


export default FormGroup
