import axios from 'axios'
import { persistStore } from 'redux-persist'
import { getReduxStore } from 'store'

import history from 'utils/history'
import { API_PATH } from 'utils/constants'
import { oauthService } from 'utils/api/oauth'
import { log } from 'utils/log'
import { logoutUser } from 'store/currentUser/actions'


export const NotAuthenticatedRedirectInterceptor = () => {
  const handleInvalidateSession = (isLoggingOut) => {
    if (!isLoggingOut) {
      // Handle isAuthenticated false in store
      const { store } = getReduxStore()
      store.dispatch(logoutUser())
      oauthService.handleClearSessionStorage()
      const persistor = persistStore(store)
      persistor.purge()
      history.push('/sign-in')
    }
  }

  const handleServerRejection = (error) => {
    const { response: { status } } = error
    const isLoggingOut = false
    if (status === 401 && window.location.pathname !== '/sign-in') handleInvalidateSession(isLoggingOut)
    return Promise.reject(error)
  }

  return (
    axios.interceptors.response.use(
      response => response,
      handleServerRejection,
    )
  )
}

export const OAuthRefreshTokenInterceptor = () => {
  let isRefreshing = false
  const refreshSubscribers = []

  const subscribeTokenRefresh = cb => refreshSubscribers.push(cb)
  const onRefresh = token => refreshSubscribers.map(cb => cb(token))

  const retryOriginalRequest = originalRequest => new Promise(resolve => (
    subscribeTokenRefresh((token) => {
      const updatedRequest = { ...originalRequest }
      updatedRequest.headers.Authorization = `Bearer ${token}`
      resolve(axios(updatedRequest))
    })
  ))

  const handleServerRejection = (error) => {
    const { config, response: { status } } = error
    const originalRequest = config

    if (status !== 401) return Promise.reject(error)

    if (!isRefreshing) {
      isRefreshing = true

      oauthService
        .handleTokenRefresh()
        .then((newToken) => {
          isRefreshing = false
          onRefresh(newToken)
        })
    }

    return retryOriginalRequest(originalRequest)
  }

  return (
    axios.interceptors.response.use(
      response => response,
      handleServerRejection,
    )
  )
}

export const DebuggerInterceptor = () => (
  axios.interceptors.request.use((request) => {
    log.debug(request)
    return request
  })
)

export const setupAxios = () => {
  // Globals
  axios.defaults.baseURL = API_PATH
  axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('access_token')}`

  // Interceptors
  DebuggerInterceptor()
  NotAuthenticatedRedirectInterceptor()
  // TODO: Once refresh is solved for backend, need to roll in the OAuthInterceptor
  // OAuthInterceptor()
}
