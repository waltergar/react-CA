/* eslint-disable jsx-a11y/no-static-element-interactions, max-len */
import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'

import history from 'utils/history'
import globalsConnector from 'store/globals/connector'
import featureService from 'utils/sdks/featureFlags'
import { HAMBURGER_MENU } from 'utils/constants'

import Aux from 'components/Hoc/Aux/Aux'
import withResponsive from 'components/Hoc/Responsive/Responsive'
import Button from 'components/Core/Button/Button'
import logoWhite from 'assets/images/logo/whiteFilledLogo.svg'
import logoPink from 'assets/images/logo/pinkFilledLogo.svg'
import loginIconWhite from 'assets/images/global/loginWhite.svg'
import loginIconGray from 'assets/images/global/loginGray.svg'
import hamburgerIconWhite from 'assets/images/global/hamburgerIcon.svg'
import hamburgerIconGray from 'assets/images/global/hamburgerIconGray.svg'
import closeIcon from 'assets/images/global/closeIcon.svg'
import questionIcon from 'assets/images/dashboard/questionIcon.svg'
import mailIcon from 'assets/images/homepage/mail.svg'
import signupIcon from 'assets/images/homepage/ic-signup.svg'
import styles from './Navbar.scss'


class Navbar extends Component {
  state = {
    isMenuOpen: false,
    isTransparent: true,
    isHomepage: false,
    redirectHome: false,
  }

  componentDidMount() {
    this.checkIsHomepage()
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('keydown', this.handleEscape)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('keydown', this.handleEscape)
  }

  scroll = 75

  checkIsHomepage = () => {
    if (history.location.pathname === '/') this.setState(prevState => ({ ...prevState, isHomepage: true }))
  }

  updateDimensions = () => {
    const isMobile = window.innerWidth < 768
    this.setState(prevState => ({ ...prevState, isMobile }))
  }

  handleScroll = (event) => {
    const { isMenuOpen, isTransparent } = this.state
    const scroll = event.srcElement.scrollingElement.scrollTop

    if (scroll > this.scroll && !isMenuOpen && isTransparent) {
      this.setState(prevState => ({ ...prevState, isTransparent: false }))
    } else if (scroll <= this.scroll && !isMenuOpen && !isTransparent) {
      this.setState(prevState => ({ ...prevState, isTransparent: true }))
    }
  }

  handleToggleMenu = () => {
    const { isMenuOpen } = this.state
    const scrollTop = window.scrollY

    if (scrollTop > this.scroll && isMenuOpen) {
      this.setState(prevState => ({ isTransparent: false, isMenuOpen: !prevState.isMenuOpen }))
    } else if (scrollTop <= this.scroll && isMenuOpen) {
      this.setState(prevState => ({ isTransparent: true, isMenuOpen: !prevState.isMenuOpen }))
    } else {
      this.setState(prevState => ({ isTransparent: true, isMenuOpen: !prevState.isMenuOpen }))
    }
  }

  handleNavigate = (pageNumber) => {
    // eslint-disable-next-line
    const { handleChangeHomepageNumber } = this.props

    handleChangeHomepageNumber(pageNumber)
    this.handleToggleMenu()
    window.scrollTo(0, 0)

    if (!this.state.isHomepage) {
      this.setState(ps => ({ ...ps, redirectHome: true }))
    }
  }

  handleEscape = ({ keyCode }) => {
    if (keyCode === 27 && this.state.isMenuOpen) this.handleToggleMenu()
  }

  renderHomepageMainMenu = () => (
    <div className={styles.MainMenu}>
      <ul>
        <li><Button textOnly onClick={() => this.handleNavigate(2)}>Why Credit Academy?</Button></li>
        <li><Button textOnly onClick={() => this.handleNavigate(6)}>How it works</Button></li>
        <li><Button textOnly onClick={() => this.handleNavigate(7)}>Our story</Button></li>
        <li><Button textOnly onClick={() => this.handleNavigate(8)}>Our mission</Button></li>
        <li><Button textOnly onClick={() => this.handleNavigate(10)}>Card fees</Button></li>
        <li><NavLink to='/sign-up'><Button onClick={this.handleToggleMenu} textOnly>Get Card</Button></NavLink></li>
      </ul>
    </div>
  )

  renderRedirectHome = () => {
    this.props.handleChangeHomepageNumber(0)
    this.setState(ps => ({ ...ps, redirectHome: true }))
  }

  render() {
    // eslint-disable-next-line
    const { overrideTransparency, showDisclaimerModal, isGray, isMobile } = this.props
    const { isMenuOpen, isTransparent, redirectHome } = this.state
    const loginIcon = isTransparent && !overrideTransparency ? loginIconWhite : loginIconGray
    const hamburgerIcon = isTransparent && !overrideTransparency
      ? hamburgerIconWhite
      : hamburgerIconGray

    if (redirectHome) {
      this.setState(ps => ({ ...ps, redirectHome: false }))
      return <Redirect to='/' />
    }

    return (
      <Aux>
        <nav
          className={classNames(
            styles.Navbar,
            { [styles.whiteNavbar]: (!isTransparent || overrideTransparency) && !showDisclaimerModal && !isMenuOpen },
            { [styles.grayNavbar]: (!isTransparent || overrideTransparency) && !isMenuOpen && isGray },
          )}
        >
          <div className={styles.linkGroup}>
            { featureService(HAMBURGER_MENU) ? (
              <Button
                onClick={this.handleToggleMenu}
                className={classNames(styles.navItem, styles.button)}
                icon={isMenuOpen ? closeIcon : hamburgerIcon}
                iconOnly
              />
              )
              : (
                <SvgInline
                  onClick={this.renderRedirectHome}
                  className={styles.homeLink}
                  svg={isTransparent && !overrideTransparency ? logoWhite : logoPink}
                />
              )
            }
          </div>
          { !featureService(HAMBURGER_MENU) ? null : (
            <SvgInline
              onClick={this.renderRedirectHome}
              className={styles.homeLink}
              svg={isTransparent && !overrideTransparency ? logoWhite : logoPink}
            />)
          }
          <div className={classNames(styles.linkGroup, styles.right)}>
            { !isMenuOpen && (<NavLink to='/sign-up' className={isMobile ? styles.icon : styles.signup}>{isMobile ? <SvgInline svg={signupIcon} /> : 'Sign Up'}</NavLink>) }
            { !isMenuOpen && (<NavLink to='/faqs' className={styles.icon}><SvgInline svg={questionIcon} /></NavLink>) }
            { !isMenuOpen && (<NavLink to='/contact-us' className={styles.icon}><SvgInline svg={mailIcon} /></NavLink>) }
            { !isMenuOpen && (<NavLink to='/sign-in' className={styles.icon}><SvgInline svg={loginIcon} /></NavLink>) }
          </div>
        </nav>
        { isMenuOpen && this.renderHomepageMainMenu() }
      </Aux>
    )
  }
}

Navbar.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default globalsConnector(withResponsive(Navbar))
