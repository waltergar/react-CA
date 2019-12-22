import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Aux from 'components/Hoc/Aux/Aux'
import Section, { Row, Col } from 'components/Core/Section/Section'
import InfoRow from 'components/Core/InfoRow/InfoRow'
import InfoRowHeader from 'components/Core/InfoRow/InfoRowHeader'
import Button from 'components/Core/Button/Button'

import { choresService as parentChoresService } from 'utils/api/parent'
import { choresFormatter } from 'utils/formatters/chores'
import { log } from 'utils/log'
import styles from './Chore.scss'


class ChoreContainer extends Component {
  state = {
    chores: [],
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.props.toggleHeaderTransparency(false)
    this.fetchChoresData()
  }

  fetchChoresData = () => {
    this.toggleLoader(true)
    parentChoresService
      .getChores()
      .then(this.handleIncomingChoresData)
      .catch(this.handleIncomingChoresError)
  }

  toggleLoader = loaderVisibility => (
    this.setState(
      prevState => ({ ...prevState, loading: loaderVisibility }),
      () => log.debug(this.state),
    )
  )

  handleIncomingChoresData = ({ data: chores }) => (
    this.setState(
      prevState => ({ ...prevState, chores: choresFormatter.normalizeData(chores) }),
      () => {
        this.toggleLoader(false)
        log.debug({ fn: 'handleIncomingChoresData', rawData: chores, stateData: this.state.chores })
      },
    )
  )

  handleIncomingChoresError = (error) => {
    this.setState(prevState => ({ ...prevState, error: true }))
    log.error(error)
  }

  handleDeleteChore = chore => (
    parentChoresService
      .deleteChore(chore.id)
      .then(this.fetchChoresData)
      .catch(this.handleIncomingChoresError)
  )

  renderChores = () => {
    const { getCardImageByCardId } = this.props

    return (
      this.state.chores.map(chore => (
        <InfoRow key={`${chore.id} ${chore.name}`}>
          <InfoRow.Chore
            chore={chore}
            deleteChore={this.handleDeleteChore}
            card={getCardImageByCardId(chore.cardId)}
          />
        </InfoRow>
      ))
    )
  }

  render() {
    const { chores, loading, error } = this.state
    const allGood = !loading && !error

    if (loading) return <p>Loading...</p>


    const choreHeaders = [
      { name: 'Card', width: '1', sortable: false, mobile: true, mobileWidth: '2' },
      { name: 'Chore Name', width: '7', sortable: false, mobile: true, mobileWidth: '5' },
      { name: 'Date', width: '2', sortable: false, mobile: true, mobileWidth: '5' },
      { name: 'Amount', width: '1', sortable: false, mobile: false },
      { name: 'Delete', width: '1', sortable: false, mobile: false },
    ]

    return (
      <div className={styles.ChoresContainer}>
        <Section className={styles.DashboardHeader}>
          <Row className={styles.centerVertical}>
            <Col md='3' />
            <Col md='6'>
              <h1>Chores</h1>
              <div>
                { !allGood && <p>There was an issue loading your chores.</p> }
                { allGood && chores.length === 1 && (<p>You have 1 chore</p>) }
                { allGood && chores.length > 1 && (<p>You have {chores.length} chores</p>) }
              </div>
            </Col>
            <Col md='3' align='right'>
              <NavLink to='/dashboard/create-chore'>
                <Button text='+ Add Chore' small />
              </NavLink>
            </Col>
          </Row>
        </Section>
        <Section rounded className={styles.DashboardContent}>
          { allGood && !chores.length && (
            <h3 className={styles.noChore}>You have no chores to view, add a chore.</h3>
          )}
          { allGood && chores.length > 0 && (
            <Aux>
              <InfoRowHeader columns={choreHeaders} />
              { this.renderChores() }
            </Aux>
          )}
        </Section>
      </div>
    )
  }
}

ChoreContainer.propTypes = {
  toggleHeaderTransparency: PropTypes.func.isRequired,
  getCardImageByCardId: PropTypes.func.isRequired,
}


export default ChoreContainer
