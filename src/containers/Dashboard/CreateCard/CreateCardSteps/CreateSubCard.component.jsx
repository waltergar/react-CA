import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import SvgInline from 'react-svg-inline'

import { validators, masks } from 'utils/formatters/validators'
import Avatar from 'components/Core/Avatar/Avatar'
import { Row, Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import FormGroup from 'components/Core/FormGroup/FormGroup'
// import VirtualCard from 'components/Core/VirtualCard/VirtualCard'

// import genderIcon from 'assets/images/dashboard/genderIcon.svg'
import plusIcon from 'assets/images/global/ic-plus.svg'
// import checkmarkIcon from 'assets/images/dashboard/checkmark.svg'
// import dollarIcon from 'assets/images/homepage/dollar.svg'
// import mailIcon from 'assets/images/homepage/mail.svg'
// import userIcon from 'assets/images/homepage/user.svg'
// import calendarIcon from 'assets/images/homepage/calendar.svg'
import styles from '../CreateCard.scss'

class CreateSubCard extends Component {
  state = {
    formValid: false,
    photoSrc: '',
  }

  onBeforeFileLoad = (elem) => {
    if (!this.props.handleBeforeFileLoad(elem)) {
      return false
    }
    this.props.storeAvatarFile(elem.target.files[0])
    return true
  }

  getSubCardholderInputs = () => {
    const { globals, custom: { cards: { subcard } } } = validators
    const { firstName, dob, email } = this.props
    const { storeFirstName, storeDob, storeEmail, amount, storeAmount } = this.props

    return [
      { id: 'firstName', value: firstName, validators: globals.name, handler: storeFirstName, placeholder: 'First name' },
      { id: 'dob', value: dob, validators: globals.dob, mask: masks.dob, handler: storeDob, placeholder: 'Date of birth' },
      { id: 'email', value: email, validators: globals.email, handler: storeEmail, placeholder: 'Email' },
      { id: 'amount', value: amount, validators: subcard.rate, handler: storeAmount, placeholder: 'Funding amount' },
    ]
  }

  handleIsValid = (isValid) => {
    this.setState(ps => ({ ...ps, formValid: isValid }))
  }

  renderSubCardholderForm = () => (
    <Row className={styles.form}>
      <Col md='2' />
      <Col md='8' align='center'>
        <FormGroup
          inputs={this.getSubCardholderInputs()}
          isValid={isValid => this.handleIsValid(isValid)}
        />
      </Col>
      <Col md='2' />
    </Row>
  )

  // renderCards = () => {
  //   const { cardImages, selectedCard, storeSelectedCard } = this.props
  //   const cardImageArray = Object.keys(cardImages)
  //     .map(cardImage => cardImages[cardImage])
  //     .filter(cardImage => !cardImage.decomm)

  //   return cardImageArray.map(card => (
  //     <div key={card.id + card.color} className={styles.cardContainer} >
  //       { (card.id === selectedCard) && (
  //         <div className={styles.checked}>
  //           <SvgInline className={styles.icon} svg={checkmarkIcon} />
  //         </div>
  //       )}
  //       <VirtualCard
  //         className={classNames({ [styles.selected]: card.id === selectedCard })}
  //         onClick={() => storeSelectedCard(card.id)}
  //         image={card.imageUrl}
  //         color={card.color}
  //         naked
  //       />
  //     </div>
  //   ))
  // }

  renderUploadPhoto = () => {
    const { avatarImage, storeAvatarImage } = this.props

    return (
      <div className={styles.cardContainer} >
        <div>
          <Avatar
            width={350}
            height={200}
            label={
              <div>
                { avatarImage && <div>Drag frame to adjust or </div> }
                <SvgInline className={styles.icon} svg={plusIcon} />
                <span>Upload a{ avatarImage && ' different'} photo (Max: 5M)</span>
              </div>
            }
            onCrop={imgFile => storeAvatarImage(imgFile)}
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={avatarImage || this.state.photoSrc}
          />
        </div>
      </div>
    )
  }

  renderSelectCardDesign = () => (
    <Row className={styles.SelectADesign}>
      <Col sm='0' md='1' />
      <Col className={styles.cardRow} sm='12' md='10' align='center'>
        { this.renderUploadPhoto() }
      </Col>
      <Col sm='0' md='1' />
    </Row>
  )

  render() {
    const { step, handleChangeStep, loading } = this.props
    const { formValid } = this.state

    return (
      <Aux>
        { (step === 3) && this.renderSubCardholderForm() }
        {/* { (step === 3) && this.renderSelectCardDesign() } */}
        <Row className={styles.buttonGroup} style={{ marginTop: 10 }}>
          <Col md='12' align='center'>
            <Button disabled={!formValid || loading} onClick={() => handleChangeStep()} text='Create card' primary />
            {/*
              (step === 3) &&
              <Button
                disabled={!avatarImage}
                onClick={() => handleChangeStep()}
                text='Next'
                primary nextIcon
              />
            */}
          </Col>
        </Row>
      </Aux>
    )
  }
}

CreateSubCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // gender: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  // selectedCard: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,

  storeFirstName: PropTypes.func.isRequired,
  storeDob: PropTypes.func.isRequired,
  storeEmail: PropTypes.func.isRequired,
  // storeGender: PropTypes.func.isRequired,
  storeAmount: PropTypes.func.isRequired,
  // storeSelectedCard: PropTypes.func.isRequired,
  storeAvatarImage: PropTypes.func.isRequired,
  storeAvatarFile: PropTypes.func.isRequired,

  // cardImages: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  handleChangeStep: PropTypes.func.isRequired,
  handleBeforeFileLoad: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CreateSubCard
