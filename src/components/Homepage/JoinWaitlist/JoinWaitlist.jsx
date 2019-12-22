/* eslint-disable max-len */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SVGInline from 'react-svg-inline'
import { NavLink } from 'react-router-dom'

import { log } from 'utils/log'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Modal from 'components/Core/Modal/Modal'
import Button from 'components/Core/Button/Button'
import Textbox from 'components/Core/Textbox/Textbox'
import ContentPage from 'components/Core/ContentPage/ContentPage'
import { Row, Col } from 'components/Core/Section/Section'
import { commonService } from 'utils/api/common'

import successIcon from 'assets/images/dashboard/successCheckIcon.svg'
import mailIcon from 'assets/images/homepage/mail.svg'
import styles from './JoinWaitlist.scss'


class JoinWaitlist extends Component {
  state = {
    email: '',
    formSuccess: false,
    accountAlreadyExists: false,
    formAlreadyExists: false,
  }

  handleOnSubmit = () => {
    const { email } = this.state
    const payload = { email }

    commonService
      .subscribeWaitingList(payload)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  handleSuccess = () => (
    this.setState(ps => ({ ...ps, formSuccess: true }))
  )

  handleError = (error) => {
    if (error.response.status === 409) this.setState(ps => ({ ...ps, accountAlreadyExists: true }))
    else if (error.response.status === 410) this.setState(ps => ({ ...ps, formAlreadyExists: true }))
    log.error(error)
  }

  handleEmailChange = email => (
    this.setState(ps => ({ ...ps, email }))
  )

  render() {
    const { isMobile } = this.props
    const { email, formSuccess, formAlreadyExists, accountAlreadyExists } = this.state

    if (formSuccess || formAlreadyExists || accountAlreadyExists) {
      return (
        <div className={styles.JoinWaitlist}>
          <ContentPage title='Join wait list' blue>
            <Modal className={styles.SuccessModal} large>
              <div className={styles.content}>
                { !isMobile && <SVGInline svg={successIcon} /> }
                { formSuccess && <h1>We’ve added you to the waitlist!</h1> }
                { formAlreadyExists && <h1>You’re already in line! We’ll call you when we’re ready.</h1> }
                { accountAlreadyExists && <h1>You’re already a Credit Academy member!</h1> }
                { !isMobile && accountAlreadyExists && (
                  <p>
                    Head over to the login page to access your account.<br />Forgot your password?
                    You can reset it there!
                  </p>
                )}
                { !isMobile && !formAlreadyExists && !accountAlreadyExists && (
                  <p>
                    We’ll notify you when it’s your turn to teach
                    your teens how to use credit wisely.
                  </p>
                )}
                { !isMobile && <p>Thank you,<br />The Credit Academy Team</p> }
                { isMobile && (
                  <NavLink to='/'>
                    <Button className={styles.mobileButton} small nocaps primary text='Done' />
                  </NavLink>
                )}
                { !isMobile && (
                  <div className={styles.buttonContainer}>
                    <NavLink to='/'>
                      <Button className={styles.button} nocaps primary text='Done' />
                    </NavLink>
                  </div>
                )}
              </div>
            </Modal>
          </ContentPage>
        </div>
      )
    }

    return (
      <div className={styles.JoinWaitlist}>
        <ContentPage title='Join wait list' blue>
          <Row>
            <Col md='8'>
              <Textbox
                icon={mailIcon}
                value={email}
                placeholder='Enter your email'
                handleValueChange={this.handleEmailChange}
                isTransparent
              />
              <Button
                onClick={this.handleOnSubmit}
                className={styles.button}
                text='Join'
                primary
              />
            </Col>
          </Row>
        </ContentPage>
      </div>
    )
  }
}

JoinWaitlist.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}
JoinWaitlist.defaultProps = {}

export default withResponsive(JoinWaitlist)
