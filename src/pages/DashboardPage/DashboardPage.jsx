// TODO: Add prop validation
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'

import Loading from 'components/Core/Loading/Loading'
import DashboardNavbar from 'containers/Dashboard/Navbar/Navbar.container'
import FirstTimeContainer from 'containers/Dashboard/FirstTime/FirstTime.container'
import CreateCardContainer from 'containers/Dashboard/CreateCard/CreateCard.container'
import CreateChoreContainer from 'containers/Dashboard/CreateChore/CreateChore.container'
import PayContainer from 'containers/Dashboard/Pay/Pay.container'
import ChoreContainer from 'containers/Dashboard/Chore/Chore.container'
import HelpContainer from 'containers/Dashboard/Help/Help'
import ProfileContainer from 'containers/Dashboard/Profile/Profile.container'
import Footer from 'containers/Footer/Footer'
import CardPage from 'pages/DashboardPage/pages/CardPage/CardPage'

import { getReduxStore } from 'store'
import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import cardsConnector from 'store/cards/connector'
import createCardConnector from 'store/createCard/connector'
import { oauthService } from 'utils/api/oauth'
import styles from './DashboardPage.scss'


class DashboardPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { isParent } = this.props
    oauthService
      .handleRetrieveCurrentUser(isParent, this.props.storeProfile)
      .finally(() => this.setState(() => ({ loading: false })))
  }

  handleLogout = () => {
    const { store } = getReduxStore()
    const persistor = persistStore(store)
    this.props.flushCreateCardStore()
    persistor.purge()
    oauthService.revokeToken()
    oauthService.handleClearSessionStorage()
    this.props.storeTransactions([])
    this.props.storeCards([])
    this.props.logoutUser()
  }

  render() {
    const {
      match: { url },
      isPageLoading,
      isAuthenticated,
      isParent,
      isChild,
    } = this.props
    const { loading } = this.state

    // TODO: DASHBOARD LOADER COMPONENT
    if (loading) return <Loading />
    if (!isAuthenticated) return <Redirect to='/sign-in' />

    return (
      <div>
        <DashboardNavbar url={url} handleLogout={this.handleLogout} />
        <div className={styles.Dashboard}>
          <Switch>
            { isParent && <Route path={`${url}/first-time`} component={FirstTimeContainer} /> }
            { isParent && <Route path={`${url}/create-card`} component={CreateCardContainer} /> }
            <Route path={`${url}/profile`} component={ProfileContainer} />
            <Route path={`${url}/faqs`} component={HelpContainer} />
            {/* { isParent && !isRegistered && url && <Redirect to='/dashboard/first-time' /> } */}
            { isParent && <Route path={`${url}/chores`} component={ChoreContainer} /> }
            { isParent && <Route path={`${url}/create-chore`} component={CreateChoreContainer} /> }
            { isChild && <Route path={`${url}/pay`} component={PayContainer} /> }
            <Route path={`${url}/cards`} component={CardPage} />
            <Redirect to='/dashboard/cards' />
          </Switch>
        </div>
        <Footer />
        {isPageLoading && <Loading />}
      </div>
    )
  }
}

export default globalsConnector(createCardConnector(userConnector(cardsConnector(DashboardPage))))
