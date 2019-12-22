import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Section, { Row, Col } from 'components/Core/Section/Section'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import Button from 'components/Core/Button/Button'
import CreateCardModal from 'components/Dashboard/CreateCardModal/CreateCardModal'
// import history from 'utils/history'
import cardImage from 'assets/images/cc-home.png'
import styles from './FirstTime.scss'


class FirstTimeContainer extends Component {
  state = {
    createCardOpen: false,
    isActivated: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
  }

  gotoDashboard = () => {
    this.props.storeProfile({ ...this.props.currentUser, registered_at_provider: true })
    this.setState(() => ({ isActivated: true }))
    // history.pushState('/dashboard/cards')
  }

  toggleCreateCardModal = (step) => {
    this.setState(prevState => ({ createCardOpen: !prevState.createCardOpen, step }))
  }

  render() {
    if (this.state.isActivated) return <Redirect to='/dashboard/cards' />

    return (
      <div className={styles.ChoresContainer}>
        <Section className={styles.DashboardHeader}>
          <Row className={styles.centerVertical}>
            <Col md='2' />
            <Col md='8'>
              <h1>Hi <span className={styles.parentRole}>{this.props.parentRole}</span>!</h1>
              <h2>
                Welcome, create your first Credit Academy MasterCard
              </h2>
            </Col>
            <Col md='2' />
          </Row>
          <Row>
            <Col md='12'>
              <div className={styles.cardAndStripes}>
                <VirtualCard
                  className={styles.virtualCard}
                  image={cardImage}
                  // color='rgba(109, 211, 222, 0.9)'
                  nameOnly
                  name=''
                  mid
                />
              </div>
            </Col>
          </Row>
        </Section>
        <Section className={styles.DashboardContent}>
          <Button className={styles.button} text='Activate account' primary onClick={() => this.toggleCreateCardModal(1)} />
        </Section>
        { this.state.createCardOpen && (
          <CreateCardModal
            onClose={this.toggleCreateCardModal}
            onReload={this.gotoDashboard}
            step={1}
          />
        )
        }
      </div>
    )
  }
}

FirstTimeContainer.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  storeProfile: PropTypes.func.isRequired,
  parentRole: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
}


export default FirstTimeContainer
