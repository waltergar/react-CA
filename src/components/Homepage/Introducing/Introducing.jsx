import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'

import image1 from 'assets/images/cc-1.png'
import image2 from 'assets/images/cc-2.png'
import image3 from 'assets/images/cc-3.png'
import image4 from 'assets/images/cc-4.png'
import image5 from 'assets/images/cc-5.png'
import image6 from 'assets/images/cc-6.jpg'
import plusIcon from 'assets/images/homepage/plusIcon.svg'
import shoppingCartIcon from 'assets/images/homepage/shoppingCartIcon.svg'
import checkSquareIcon from 'assets/images/homepage/checkSquareIcon.svg'
import graduationIcon from 'assets/images/homepage/graduationIcon.svg'
import facesIcon from 'assets/images/homepage/facesIcon.svg'

import styles from './Introducing.scss'


class Introducing extends Component {
  state = {
    cardCount: 6,
  }

  componentDidUpdate() {
    this.setCardCountForScreenSize()
  }

  setCardsContainerRef = (element) => {
    this.cardsContainerRef = element
    this.setCardCountForScreenSize()
  }

  setCardCountForScreenSize = () => {
    const element = this.cardsContainerRef
    const elementBoundary = element && element.getBoundingClientRect()
    const cardCount = elementBoundary
      ? Math.floor(elementBoundary.width / 230)
      : 6

    if (cardCount !== this.state.cardCount) {
      this.setState(ps => ({ ...ps, cardCount }))
    }
  }

  cardImages = [
    { name: 'Emma', color: 'rgba(109, 211, 222, 0.9)', imageUrl: image1 },
    { name: 'Liam', color: 'rgba(235, 142, 169, 0.9)', imageUrl: image2 },
    { name: 'Olivia', color: 'rgba(185, 146, 113, 0.9)', imageUrl: image3 },
    { name: 'Noah', color: 'rgba(172, 172, 172, 0.9)', imageUrl: image4 },
    { name: 'Ava', color: '#eeffaa', imageUrl: image6 },
    { name: 'Oliver', color: '#eeffaa', imageUrl: image5 },
  ]

  iconValuePairs = [
    { icon: plusIcon, value: 'Create a new card' },
    { icon: shoppingCartIcon, value: 'Shop online' },
    { icon: checkSquareIcon, value: 'Pay with chores' },
    { icon: facesIcon, value: 'Score emojis' },
    { icon: graduationIcon, value: 'Learn & graduate' },
  ]

  renderCardImages = () => (
    this.cardImages.map(card => (
      <VirtualCard
        key={card.name}
        className={styles.card}
        name={card.name}
        image={card.imageUrl}
        color={card.color}
        nameOnly
      />
    )).splice(0, this.state.cardCount)
  )

  render() {
    const { signupActive } = this.props

    return (
      <div id='credit-academy-mastercard'>
        <Section background='white' className={styles.Introducing}>
          <Row className={styles.cardGroupRow}>
            <Col className={styles.cardGroupColumn} md='12'>
              <div className={styles.cardGroup} ref={this.setCardsContainerRef}>
                { this.renderCardImages() }
              </div>
            </Col>
          </Row>

          <Row>
            <Col md='12'>
              <h1 className={styles.title}>
                He pays his Dad back with chores.
              </h1>
            </Col>
          </Row>

          <Row>
            <Col md='12'>
              <NavLink to={signupActive ? '/sign-up' : '/subscribe'}>
                <Button className={styles.button} nocaps primary text={signupActive ? 'Create Card' : 'Join waitlist'} />
              </NavLink>
              {this.props.pageNav}
            </Col>
          </Row>
        </Section>
      </div>
    )
  }
}

Introducing.propTypes = {
  signupActive: PropTypes.bool.isRequired,
  pageNav: PropTypes.node.isRequired,
}

export default Introducing
