import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import Textbox from 'components/Core/Textbox/Textbox'
import Dropdown from 'components/Core/Dropdown/Dropdown'

import globalsConnector from 'store/globals/connector'
import cardsConnector from 'store/cards/connector'
import { choresService } from 'utils/api/parent'
import { validators } from 'utils/formatters/validators'
import { log } from 'utils/log'

import pencil from 'assets/images/homepage/pencil.svg'
import cardIcon from 'assets/images/homepage/credit-card.svg'
import dollar from 'assets/images/homepage/dollar.svg'
import styles from './CreateChore.scss'

class CreateChoreContainer extends Component {
  state = {
    selectedCard: { value: null, isValid: false },
    choreName: { value: '', isValid: false },
    rate: { value: '', isValid: false },
    isLoading: false,
    choreCreated: false,
    error: false,
  }

  componentDidMount() {
    const { toggleHeaderTransparency } = this.props
    toggleHeaderTransparency(true)
    log.debug(this.props)
  }

  getCardOptions = () => (
    this.props.cards.map(card => ({ id: card.id, name: `${card.cardHolder.fullName}'s Card` }))
  )

  handleToggleIsLoading = isLoading => this.setState(prevState => ({ ...prevState, isLoading }))

  handleCardChange = selectedCard => (
    this.setState(prevState => ({
      ...prevState,
      selectedCard: { value: selectedCard, isValid: this.handleValidateSelectedCard(selectedCard) },
    }))
  )

  handleChoreNameChange = choreName => (
    this.setState(prevState => ({
      ...prevState,
      choreName: { value: choreName, isValid: this.handleValidateChoreName(choreName) },
    }))
  )

  handleRateChange = rate => (
    this.setState(prevState => ({
      ...prevState,
      rate: { value: rate, isValid: this.handleValidateRate(rate) },
    }))
  )

  handleValidateSelectedCard = selectedCard => selectedCard !== null
  handleValidateChoreName = choreName => choreName.length > 0 && choreName.length < 80
  handleValidateRate = rate => rate >= 0.01

  formValidator = () => {
    const { selectedCard, choreName, rate } = this.state
    return selectedCard.isValid && choreName.isValid && rate.isValid
  }

  handleChoreCreateSuccess = () => {
    this.handleToggleIsLoading(false)
    this.setState(prevState => ({ ...prevState, choreCreated: true }))
  }

  handleChoreCreateError = (error) => {
    this.setState(prevState => ({ ...prevState, error: true }))
    log.error(error)
  }

  handleCreateChore = () => {
    const isValid = this.formValidator()
    if (isValid) {
      const { rate, choreName, selectedCard: { value: cardId } } = this.state
      const formData = {
        name: choreName.value,
        rate: Number.parseFloat(rate.value),
      }

      this.handleToggleIsLoading(true)
      choresService
        .createChore(cardId, formData)
        .then(this.handleChoreCreateSuccess)
        .catch(this.handleChoreCreateError)
    }
  }

  render() {
    const { selectedCard, choreName, rate, isLoading, choreCreated, error } = this.state

    if (!isLoading && choreCreated) return <Redirect to='/dashboard/cards' />

    return (
      <div className={styles.CreateChore}>
        <Section>
          <Row className={styles.header}>
            <Col md='3' />
            <Col md='6'>
              <h1>Create a chore</h1>
              <p>
              Link chores to a Credit Academy Mastercard
              so your teen can pay you back for purchases with chore money.
              </p>
            </Col>
            <Col md='3' />
          </Row>
          <Row className={styles.form}>
            <Col md='2' />
            <Col md='8' align='center'>
              <Dropdown className={styles.textbox} value={selectedCard.value} handleValueChange={this.handleCardChange} placeholder="Select card" icon={cardIcon} options={this.getCardOptions()} isTransparent />
              <Textbox validators={validators.custom.chores.name} className={styles.textbox} value={choreName.value} handleValueChange={this.handleChoreNameChange} placeholder='Enter chore name' icon={pencil} isTransparent />
              <Textbox validators={validators.custom.chores.rate} className={styles.textbox} value={rate.value} handleValueChange={this.handleRateChange} placeholder='Rate     0.00' icon={dollar} isTransparent />
            </Col>
            <Col md='2' />
          </Row>
          <Row className={styles.buttonGroup}>
            <Col md='12' align='center'>
              <Button
                primary
                onClick={this.handleCreateChore}
                disabled={!this.formValidator()}
                text='Add Chore'
              />
              { isLoading && <p>Loading...</p> }
              { error && <p>There was an unexpected issue when creating your chore, try again.</p> }
            </Col>
          </Row>
        </Section>
      </div>
    )
  }
}

CreateChoreContainer.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
}

export default cardsConnector(globalsConnector(CreateChoreContainer))
