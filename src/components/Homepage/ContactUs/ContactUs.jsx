import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Button from 'components/Core/Button/Button'
import FormGroup from 'components/Core/FormGroup/FormGroup'
import ContentPage from 'components/Core/ContentPage/ContentPage'
import { Row, Col } from 'components/Core/Section/Section'
import ProgramModal from 'components/Core/ProgramModal/ProgramModal'
import Footer from 'containers/Footer/Footer'

import { commonService } from 'utils/api/common'
import { validators } from 'utils/formatters/validators'
import { log } from 'utils/log'

import mailIcon from 'assets/images/homepage/mail.svg'
import msgIcon from 'assets/images/homepage/pencil.svg'
import styles from './ContactUs.scss'


class ContactUs extends Component {
  state = {
    email: '',
    message: '',
    formValid: false,
    isConfirm: false,
    showDisclaimerModal: false,
  }

  getContactFormInputs = () => {
    const { globals } = validators
    const { email, message } = this.state

    return [
      { id: 'email', value: email, validators: globals.email, handler: value => this.handleStoreFormChange('email', value), placeholder: 'Email', icon: mailIcon },
      { id: 'message', value: message, handler: value => this.handleStoreFormChange('message', value), placeholder: 'Your message', icon: msgIcon },
    ]
  }

  handleToggleModal = () => (
    this.setState(ps => ({ ...ps, showDisclaimerModal: !ps.showDisclaimerModal }))
  )

  handleStoreFormChange = (stateKey, value) => (
    this.setState(ps => ({ ...ps, [stateKey]: value }))
  )

  handleOnSubmit = () => {
    const { email, phone, name, message } = this.state
    const payload = { email, phone, name, message }

    commonService
      .contactUs(payload)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  handleSuccess = (response) => {
    log.info(response)
    this.setState(ps => ({ ...ps,
      email: '',
      message: '',
      formValid: false,
      isConfirm: true,
    }))
  }

  handleError = response => log.error(response)

  render() {
    const { formValid, isConfirm, showDisclaimerModal } = this.state

    return (
      <div className={styles.ContactUs}>
        {isConfirm ?
          <ContentPage title='Confirmation' blue>
            <Row>
              <Col md='8'>
                <p className={styles.conformMessage}>
                  {
                    `Thank you! We’ve received your message and we’ll get
                    back to you shortly. Credit Academy`
                  }
                </p>
                <NavLink to='/'>
                  <Button primary text='Return to Homepage' />
                </NavLink>
              </Col>
            </Row>
          </ContentPage>
        :
          <ContentPage title='Contact Us' blue>
            <Row>
              <Col md='8'>
                <FormGroup
                  inputs={this.getContactFormInputs()}
                  isValid={value => this.handleStoreFormChange('formValid', value)}
                />
                <Button
                  className={styles.button}
                  onClick={this.handleOnSubmit}
                  disabled={!formValid}
                  text='Send'
                  primary
                />
              </Col>
            </Row>
          </ContentPage>
        }
        { <Footer handleToggleModal={this.handleToggleModal} /> }
        { showDisclaimerModal && <ProgramModal handleToggleModal={this.handleToggleModal} />}
      </div>
    )
  }
}

ContactUs.propTypes = {}
ContactUs.defaultProps = {}

export default ContactUs
