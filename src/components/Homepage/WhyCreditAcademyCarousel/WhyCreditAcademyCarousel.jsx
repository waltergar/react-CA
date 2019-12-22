// eslint-disable-next-line
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react'
import classNames from 'classnames'
import SvgInline from 'react-svg-inline'

import { Row, Col } from 'components/Core/Section/Section'
import createACardIcon from 'assets/images/homepage/createACard.svg'
import shopIcon from 'assets/images/homepage/shop.svg'
import payWithYourCardIcon from 'assets/images/homepage/payWithYourCard.svg'
import styles from './WhyCreditAcademyCarousel.scss'


class WhyCreditAcademyCarousel extends Component {
  state = {
    carousel: 1,
  }

  carouselItems = [
    { icon: createACardIcon, header: 'Create a card', value: 'Easy to use. Create a Credit Academy MasterCard and authorize your teen to use it.' },
    { icon: shopIcon, header: 'Shop', value: 'Your teen can shop online with their new Credit Academy Virtual MasterCard.' },
    { icon: payWithYourCardIcon, header: 'Pay your card', value: 'Submit chores as payment, and if you approve, we\'ll reload their card with cash to reconcile their card balance.' },
  ]

  handleSetCarouselPosition = carousel => this.setState(ps => ({ ...ps, carousel }))

  renderCarousel = () => {
    const { carousel } = this.state
    const carouselItem = this.carouselItems[carousel - 1]

    return (
      <div className={styles.carouselItem}>
        <div className={styles.icon}>
          <SvgInline svg={carouselItem.icon} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.header}>{carouselItem.header}</h1>
          <p className={styles.value}>{carouselItem.value}</p>
        </div>
      </div>
    )
  }

  renderCarouselToggle = () => {
    const { carousel } = this.state
    const options = this.carouselItems.map((_, idx) => idx + 1)
    const toggles = options.map((option) => {
      const onClick = () => this.handleSetCarouselPosition(option)
      const className = carousel === option
        ? classNames(styles.option, styles.selected)
        : styles.option

      return (
        <li className={className} onClick={onClick} key={`carouselOption:${option}`}>
          {option}
        </li>
      )
    })

    return (<div className={styles.carouselToggle}><ul>{toggles}</ul></div>)
  }

  render() {
    return (
      <div className={styles.WhyCreditAcademyCarousel} id='why-choose-credit-academy'>
        <Row>
          <Col md='2' />
          <Col md='9'>
            <div className={styles.carouselSection}>
              { this.renderCarousel() }
              { this.renderCarouselToggle() }
            </div>
          </Col>
          <Col md='1' />
        </Row>
      </div>
    )
  }
}


export default WhyCreditAcademyCarousel
