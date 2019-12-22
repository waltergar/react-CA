import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { ROUTES } from 'routes/routes'
import ProtectedRoute from 'routes/ProtectedRoute'
import styles from './PageContent.scss'


export const generateRoute = route => (
  route.protected
    ? (
      <ProtectedRoute
        path={route.path}
        component={route.component}
        exact={route.exact}
        key={route.path + route.default}
      />
    )
    : (
      <Route
        path={route.path}
        component={route.component}
        exact={route.exact}
        key={route.path + route.default}
      />
    )
)

const PageContent = () => (
  <div className={styles.PageContent}>
    <Switch>
      <Redirect exact from='/dashboard' to='/dashboard/cards' />
      { ROUTES.map(route => generateRoute(route)) }
    </Switch>
  </div>
)

export default PageContent
