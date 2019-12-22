import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

import Aux from 'components/Hoc/Aux/Aux'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import Button from 'components/Core/Button/Button'
import { Row, Col } from 'components/Core/Section/Section'
import styles from '../CreateCard.scss'


class Confirmation extends Component {
  state = {
    firstName: this.props.firstName,
    dob: this.props.dob,
    email: this.props.email,
    gender: this.props.gender,
    // isMobile: false,
  }

  renderChildDetails = () => (
    <div className={styles.childDetails}>
      <h3>{'Teen\'s Details'}</h3>
      <Row>
        <Col md='3' />
        <Col md='6' align='center' className={styles.row}>
          <div className={styles.title}>First name:</div>
          <div className={styles.value}>{ this.state.firstName }</div>
        </Col>
        <Col md='3' />
      </Row>
      <Row>
        <Col md='3' />
        <Col md='6' align='center' className={styles.row}>
          <div className={styles.title}>Date of birth: </div>
          <div className={styles.value}>{ this.state.dob }</div>
        </Col>
        <Col md='3' />
      </Row>
      <Row>
        <Col md='3' />
        <Col md='6' align='center' className={styles.row}>
          <div className={styles.title}>Email:</div>
          <div className={styles.value}>{ this.state.email }</div>
        </Col>
        <Col md='3' />
      </Row>
      <Row>
        <Col md='3' />
        <Col md='6' align='center' className={styles.row}>
          <div className={styles.title}>Gender:</div>
          <div className={styles.value}>{ this.state.gender }</div>
        </Col>
        <Col md='3' />
      </Row>
    </div>
  )

  renderCardDetails = () => {
    const { firstName, amount } = this.props
    // const cardImage = cardImages[selectedCard]

    return (
      <div className={styles.cardDetails}>
        <div className={styles.creditLimitLabel}>Credit Limit</div>
        <div className={styles.creditLimit}>${amount}</div>
        <VirtualCard
          key='card'
          name={firstName}
          // image={cardImage.imageUrl}
          // color={cardImage.color}
          nameOnly
        />
      </div>
    )
  }

  renderDisclaimer = () => (
    <div className={styles.disclaimer}>
      <p>
        By pressing the “Create” button, I acknowledge that I
          have reviewed the card’s Payments & Fee Rates, Terms & Conditions
          and agree with them
      </p>
    </div>
  )

  render() {
    const { loading, handleChangeStep, handleCallApis, firstName, email } = this.props
    if (loading) return <p>Loading from parent prop...</p>

    return (
      <Aux>
        <Row className={styles.Confirmation}>
          <Col md='2' />
          <Col md='8'>
            { this.renderChildDetails() }
          </Col>
          <Col md='2' />
        </Row>

        <Row className={styles.Confirmation}>
          <Col md='2' />
          <Col md='8'>
            { this.renderCardDetails() }
          </Col>
          <Col md='2' />
        </Row>

        <Row className={styles.Confirmation}>
          <Col md='3' />
          <Col md='6'>
            <p className={styles.white}>
              Upon confirming, {firstName} will receive details about their Credit
                Academy card at {email}.
            </p>
          </Col>
          <Col md='3' />
        </Row>

        <Row className={styles.Confirmation}>
          <Col md='3' />
          <Col md='6'>
            { this.renderDisclaimer() }
          </Col>
          <Col md='3' />
        </Row>

        <Row className={styles.buttonGroup}>
          <Col md='12' align='center'>
            <Button onClick={() => handleChangeStep(true)} text='Back' secondary />
            <Button onClick={() => handleCallApis()} text='Create' primary />
          </Col>
        </Row>
      </Aux>
    )
  }
}

Confirmation.propTypes = {
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  // selectedCard: PropTypes.string.isRequired,
  // cardImages: PropTypes.object.isRequired,

  loading: PropTypes.bool.isRequired,
  handleChangeStep: PropTypes.func.isRequired,
  handleCallApis: PropTypes.func.isRequired,
  // currentUser: PropTypes.object.isRequired,
}


export default Confirmation
