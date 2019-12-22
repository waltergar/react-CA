/* eslint-disable no-unused-vars, max-len */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGInline from 'react-svg-inline'

import globalsConnector from 'store/globals/connector'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Aux from 'components/Hoc/Aux/Aux'
import Button from 'components/Core/Button/Button'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import Section, { Row, Col } from 'components/Core/Section/Section'

import Navbar from 'containers/Navbar/Navbar'
import WelcomeMat from 'components/Homepage/WelcomeMat/WelcomeMat'
import WelcomePiggy from 'components/Homepage/WelcomePiggy/WelcomePiggy'
import WelcomeCard from 'components/Homepage/WelcomeCard/WelcomeCard'
import WelcomeLearnMore from 'components/Homepage/WelcomeLearnMore/WelcomeLearnMore'
import CreditAcademyCommunity from 'components/Homepage/CreditAcademyCommunity/CreditAcademyCommunity'
import Fees from 'components/Homepage/Fees/Fees'
import Faqs from 'components/Faqs/Faqs'
import Footer from 'containers/Footer/Footer'

import checkSquareIcon from 'assets/images/homepage/checkSquareIcon.svg'
import facesIcon from 'assets/images/homepage/ic-cash.svg'
import earnStickerIcon from 'assets/images/dashboard/emoji-05.png'
import arrowRightIcon from 'assets/images/global/arrow-right.svg'

import image1 from 'assets/images/cc-home.png'
import styles from './HomePage.scss'

class HomePage extends Component {
  state = {
    rightNavPosition: 0,
    signupActive: true,
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleNavKeyChange)
  }

  componentDidUpdate() {
    this.setNewPosition()
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleNavKeyChange)
  }

  setRightPositionRef = (element) => {
    this.rightNavElement = element
    this.setNewPosition()
  }

  setNewPosition = () => {
    const element = this.rightNavElement
    const elementBoundary = element && element.getBoundingClientRect()
    const rightNavPosition = elementBoundary
      ? -((elementBoundary.height / 2) - elementBoundary.width - 10)
      : 0

    if (rightNavPosition !== this.state.rightNavPosition) {
      this.setState(ps => ({ ...ps, rightNavPosition }))
    }
  }

  handlePageChange = (backwards) => {
    const pageNumber = backwards
      ? this.props.homepageNumber - 1
      : this.props.homepageNumber + 1

    this.props.handleChangeHomepageNumber(pageNumber)
  }

  gotoLearnMore = (index) => {
    this.props.handleChangeHomepageNumber(index)
  }

  handleNavKeyChange = (event) => {
    const { homepageNumber } = this.props
    if (event.keyCode === 37 && homepageNumber > 0) this.handlePageChange(true)
    if (event.keyCode === 39 && homepageNumber < 2) this.handlePageChange()
  }

  renderPageNav = () => {
    const { homepageNumber: pageNumber, isMobile } = this.props
    const { rightNavPosition } = this.state
    const classes = position => classNames(
      styles.pageNav,
      position,
      { [styles.pink]: pageNumber > 0 },
    )

    if (pageNumber < 1 || pageNumber > 3) return null
    if (isMobile) {
      return (
        <Aux>
          <div className={classes(styles.left)}>
            { pageNumber !== 0 && <button onClick={() => this.handlePageChange(true)}><SVGInline className={classes(styles.arrowButton)} svg={arrowRightIcon} /></button> }
          </div>
          <div className={classes(styles.right)}>
            { pageNumber < 3 && <button onClick={() => this.handlePageChange()}>Learn more <SVGInline className={classes(styles.arrowButton)} svg={arrowRightIcon} /></button> }
          </div>
        </Aux>
      )
    }

    return (
      <Aux>
        <div className={classes(styles.left)}>
          <button onClick={() => this.handlePageChange(true)}><SVGInline className={classes(styles.arrowButton)} svg={arrowRightIcon} /> Back</button>
        </div>
        <div
          ref={this.setRightPositionRef}
          style={{ right: rightNavPosition }}
          className={classes(styles.right)}
        >
          { pageNumber < 3 && <button onClick={() => this.handlePageChange()}><SVGInline className={classes(styles.arrowButton)} svg={arrowRightIcon} /> Learn more</button> }
        </div>
      </Aux>
    )
  }

  renderContentAndCTA = ({ content, header, text, compact, white, semi, disclaimer, last }) => {
    const { isMobile } = this.props
    const { signupActive: signup } = this.state
    const colWidth = semi ? '10' : '12'

    return (
      <div className={classNames(styles.contentAndCTA, { [styles.white]: white })} style={{ marginTop: 10 }}>
        <Section className={styles.section}>
          <Row>
            { semi && <Col md='1' /> }
            { compact && <Col md='1' /> }
            <Col md={compact ? '10' : colWidth} >
              { header && <h1 className={styles.header}>{header}</h1>}
              { content && <div className={styles.content}>{content}</div> }
              { text && <div className={styles.text}>{text}</div>}
              <div className={styles.button}>
                {last &&
                  <NavLink to={signup ? '/sign-up' : '/subscribe'}>
                    <Button primary text={signup ? 'Sign up' : 'Join waitlist'} />
                  </NavLink>
                }
                { isMobile && this.renderPageNav()}
              </div>
              { disclaimer && (
                <div className={styles.disclaimer}>
                  <Button textOnly text='Learn More' onClick={this.handleToggleModal} />
                </div>
              )}
            </Col>
            { semi && <Col md='1' /> }
            { compact && <Col md='1' /> }
          </Row>
        </Section>
      </div>
    )
  }

  renderHook = () => {
    const content = (
      <VirtualCard
        className={styles.card}
        name=''
        image={image1}
        // color='rgba(109, 211, 222, 0.9)'
        nameOnly
      />
    )

    const text = `
      The Credit Academy Virtual Prepaid MasterCard® is designed to teach
      your teens about credit cards by simulating the experience of owning one.
    `

    return this.renderContentAndCTA({ content, text, compact: true })
  }

  renderShopOnline = () => {
    const content = (<img src={earnStickerIcon} className={styles.earnStickerIcon} alt='Credit Academy Score Sticker' />)
    const text = 'He earns a perfect Credit Academy Score Emoji for using his Credit Academy Mastercard® wisely.'
    return this.renderContentAndCTA({ content, text, compact: true, last: true })
  }

  renderPayWithChores = () => {
    const content = (<SVGInline className={styles.inlineVector} svg={checkSquareIcon} />)
    const text = `
      He pays his parents back with chores linked to his Credit Academy Mastercard®.
    `
    return this.renderContentAndCTA({ content, text, compact: true })
  }

  renderEarnACreditScore = () => {
    const content = (<SVGInline className={styles.earnACreditStore} svg={facesIcon} />)
    const text = `
      His Credit Academy account balance is reconciled when chore payments are accepted by his parents.
    `
    return this.renderContentAndCTA({ content, text, compact: true })
  }

  renderOurStory = () => {
    const text = (
      <Aux>
        <span>
          Once upon a time, a young couple had a boy named Marc. One day while at a shop,
          Marc asked his dad for a toy car. Dad explained he had no cash. “Use your
          credit card!”, said Marc. “How do we teach him the importance of working hard
          to pay for his purchases?” Dad wondered. “We should create an experience where
          he pays for purchases with chores linked to a card” said mom. “Score stickers
          to keep him motivated”.
        </span>
        <br />
        <br />
        <span>Eureka! The Credit Academy Mastercard® was born.</span>
      </Aux>
    )

    return this.renderContentAndCTA({ text, semi: true })
  }

  renderJoinOurCommunity = () => (
    this.renderContentAndCTA({ content: <CreditAcademyCommunity /> })
  )

  renderCardFees = () => (
    this.renderContentAndCTA({ content: <Fees /> })
  )

  renderFaqs = () => (
    this.renderContentAndCTA({ content: <Faqs /> })
  )

  render() {
    const { homepageNumber, isMobile } = this.props
    const { signupActive } = this.state
    const overrideTransparency = homepageNumber > 0
    const isGray = homepageNumber > 0

    return (
      <div className={styles.HomePage}>
        <Navbar
          overrideTransparency={overrideTransparency}
          isGray={isGray}
        />
        { !isMobile && this.renderPageNav() }
        { homepageNumber === 0 &&
          <div>
            <WelcomeMat handlePageChange={() => { this.gotoLearnMore(4) }} />
            <WelcomeCard isMobile={isMobile} />
            <WelcomePiggy
              buttonType={1}
              textType={0}
              layoutType={1}
            />
            <WelcomePiggy
              buttonType={1}
              textType={1}
              layoutType={0}
            />
            <WelcomePiggy
              buttonType={2}
              textType={2}
              layoutType={1}
            />

            <WelcomePiggy
              buttonType={1}
              textType={3}
              layoutType={0}
            />
            <WelcomePiggy
              buttonType={1}
              textType={4}
              layoutType={1}
            />
            { this.renderJoinOurCommunity() }
          </div>
        }
        { homepageNumber === 1 && this.renderPayWithChores() }
        { homepageNumber === 2 && this.renderEarnACreditScore() }
        { homepageNumber === 3 && this.renderShopOnline() }
        { homepageNumber === 4 &&
          <WelcomeLearnMore />
        }
        {/* { homepageNumber === 4 && this.renderOurStory() } */}
        {/* { homepageNumber === 5 && this.renderJoinOurCommunity() } */}
        {/* { homepageNumber === 6 && this.renderFaqs() } */}
        { <Footer /> }
      </div>
    )
  }
}

HomePage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  homepageNumber: PropTypes.number,
  handleChangeHomepageNumber: PropTypes.func,
}

HomePage.defaultProps = {
  homepageNumber: 0,
  handleChangeHomepageNumber: () => {},
}


export default globalsConnector(withResponsive(HomePage))
