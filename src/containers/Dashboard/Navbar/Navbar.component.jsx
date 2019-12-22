import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import history from 'utils/history'
import SVGInline from 'react-svg-inline'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Button from 'components/Core/Button/Button'
import cardIcon from 'assets/images/dashboard/cardIcon.svg'
// import questionIcon from 'assets/images/dashboard/questionIcon.svg'
import userIcon from 'assets/images/dashboard/userIcon.svg'
import logo from 'assets/images/logo/pinkFilledLogo.svg'
import logoutIcon from 'assets/images/global/log-out.svg'
import styles from './Navbar.scss'

class DashboardNavbar extends Component {
  leftNavLinks = () => {
    const { url, isTransparentHeader } = this.props
    const onProfileRoute = `${url}/profile` === history.location.pathname
    const onCreateChoresRoute = `${url}/create-chore` === history.location.pathname
    const onParentFirstTimeRoute = `${url}/first-time` === history.location.pathname

    return [
      {
        route: `${url}/cards`,
        icon: cardIcon,
        text: 'Cards',
        isHidden: (isTransparentHeader && !onCreateChoresRoute && !onProfileRoute)
          || onParentFirstTimeRoute,
      },
    ]
  }

  rightNavLinks = () => {
    const { url, handleLogout } = this.props

    return [
      // { route: `${url}/faqs`, icon: questionIcon, text: 'FAQ' },
      { route: `${url}/profile`, icon: userIcon, text: 'Cards' },
      { route: null, icon: logoutIcon, text: 'Logout', isButton: true, onClick: handleLogout },
    ]
  }

  render() {
    const { isTransparentHeader } = this.props

    const renderLinks = navLinks => (
      navLinks.map(navLink => (
        navLink.isButton
          ? !navLink.isHidden
            && (
              <Button
                key={`${navLink.route} ${navLink.text}`}
                onClick={navLink.onClick}
                className={classNames(styles.navItem, styles.button)}
                icon={navLink.icon}
                iconOnly
              />
            )
          : !navLink.isHidden
            && (
              <NavLink
                key={`${navLink.route} ${navLink.text}`}
                to={navLink.route}
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <SVGInline svg={navLink.icon} />
              </NavLink>
            )
      ))
    )

    return (
      <div className={
        classNames(styles.DashboardNavbar, { [styles.transparent]: isTransparentHeader })}
      >
        <Section className={styles.navSection} containerRealStyle={{ maxWidth: '100%' }}>
          <Row className={styles.navRow}>
            <Col md='4' align='left'>
              <NavLink to='/dashboard'>
                <SVGInline className={styles.logo} svg={logo} />
              </NavLink>
            </Col>
            <Col md='4' />
            <Col md='4' className={classNames(styles.linkGroup, styles.right)}>{ renderLinks(this.rightNavLinks())}</Col>
          </Row>
        </Section>
      </div>
    )
  }
}

DashboardNavbar.propTypes = {
  url: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isTransparentHeader: PropTypes.bool.isRequired,
}


export default DashboardNavbar
