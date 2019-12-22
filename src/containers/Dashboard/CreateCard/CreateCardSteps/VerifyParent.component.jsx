import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { validators, masks } from 'utils/formatters/validators'
import { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import FormGroup from 'components/Core/FormGroup/FormGroup'
import mail from 'assets/images/homepage/mail.svg'
import calendar from 'assets/images/homepage/calendar.svg'
import userIcon from 'assets/images/dashboard/userIcon.svg'
import phoneIcon from 'assets/images/homepage/phone.svg'
import errorIcon from 'assets/images/dashboard/smallErrorIcon.svg'

import styles from '../CreateCard.scss'


class VerifyParent extends Component {
  state = {
    isValid: false,
  }

  parentInputs = () => {
    const { globals } = validators
    const {
      parentDob,
      parentSsn,
      parentFullName,
      parentPhone,
      parentAddress,
      errors,
    } = this.props
    const {
      storeParentDob,
      storeParentSsn,
      storeParentFullName,
      storeParentPhone,
      storeParentAddress,
    } = this.props

    return [
      { id: 'parentFullName', placeholder: 'Your first and last name', value: parentFullName, icon: userIcon, handler: storeParentFullName, validators: globals.firstLastOnly },
      { id: 'parentPhone', placeholder: 'Mobile', value: parentPhone, icon: phoneIcon, handler: storeParentPhone, mask: masks.telephone, validators: globals.phoneNumber },
      { id: 'parentAddress', placeholder: 'Address', value: parentAddress, icon: userIcon, handler: storeParentAddress, isAddress: true, validators: globals.streetAddress },
      { id: 'parentDob', value: parentDob, mask: masks.dob, handler: storeParentDob, validators: globals.dob, placeholder: 'Date of birth', icon: errors && errors.dob ? errorIcon : calendar },
      { id: 'parentSsn', value: parentSsn, mask: masks.ssn, handler: storeParentSsn, validators: globals.ssn, placeholder: 'SSN', icon: errors && errors.ssn ? errorIcon : mail },
    ]
  }

  handleIsValid = isValid => this.setState(ps => ({ ...ps, isValid }))

  render() {
    const { handleChangeStep, onCancel } = this.props
    const { isValid } = this.state

    return (
      <Aux>
        <Row className={styles.form}>
          <Col md='2' />
          <Col md='8' align='center'>
            <FormGroup
              inputs={this.parentInputs()}
              isValid={this.handleIsValid}
            />
          </Col>
          <Col md='2' />
        </Row>
        <Row>
          <Col md='12' className={styles.activateContent}>
            {'Why do we need this information? The Patriot Act \n' +
            'requires that we identify our customers by means of \n' +
            'a social security number, date of birth and current \n' +
            'mailing address. We will never run your credit to \n' +
            'create a card account.'
            }
          </Col>
        </Row>
        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button disabled={!isValid} primary onClick={() => handleChangeStep()} text='Activate' />
          </Col>
          <Col md='12' align='center'>
            <Button className={styles.cancelButton} textOnly onClick={() => onCancel()} text='Cancel' />
          </Col>
        </Row>
      </Aux>
    )
  }
}

VerifyParent.propTypes = {
  handleChangeStep: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  parentFullName: PropTypes.string.isRequired,
  parentAddress: PropTypes.string.isRequired,
  parentPhone: PropTypes.string.isRequired,
  parentDob: PropTypes.string.isRequired,
  parentSsn: PropTypes.string.isRequired,
  storeParentDob: PropTypes.func.isRequired,
  storeParentSsn: PropTypes.func.isRequired,
  storeParentFullName: PropTypes.func.isRequired,
  storeParentAddress: PropTypes.func.isRequired,
  storeParentPhone: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

VerifyParent.defaultProps = {
  errors: null,
}


export default VerifyParent
