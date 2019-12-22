import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from 'react-router-dom'

import { getReduxStore } from 'store'
import { setupAxios } from 'utils/api/axios'
import history from 'utils/history'
import ScrollToTop from 'components/Hoc/ScrollToTop/ScrollToTop'
import PageContent from 'pages/PageContent'

setupAxios()

const App = () => {
  const { store } = getReduxStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Router history={history} >
          <ScrollToTop>
            <PageContent />
          </ScrollToTop>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
