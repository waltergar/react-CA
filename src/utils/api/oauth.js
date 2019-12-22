import axios from 'axios'
import qs from 'qs'
import { toGlobalId } from 'utils/formatters/global'
import { log } from 'utils/log'

import { accountService as parentAccountService } from 'utils/api/parent'
import { accountService as childAccountService } from 'utils/api/child'

/**
 * @module authService
 * @description Service used for managing user credentials and confirming accounts.
 */
export const authService = {
  /**
   * @function processEmailConfirmation
   * @description Endpoint for confirming user's email address.
   * @param {Object} payload
   * @param {string} payload.token
   * @memberof authService
   * @inner
   */
  processEmailConfirmation: payload => axios.post(
    '/auth/email/confirm',
    payload,
    { headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` } },
  ),

  /**
   * @function processPasswordResetConfirmation
   * @description Endpoint for confirming password reset.
   * @param {Object} payload
   * @param {string} payload.token
   * @param {string} payload.password
   * @memberof authService
   * @inner
   */
  processPasswordResetConfirmation: payload => axios.put(
    '/auth/resetpassword',
    payload,
    { headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` } },
  ),

  /**
   * @function retrievePasswordResetLink
   * @description Endpoint for retrieving a password reset link.
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.username
   * @memberof authService
   * @inner
   */
  retrievePasswordResetLink: payload => axios.post(
    '/auth/resetpassword',
    payload,
    { headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` } },
  ),

  /**
   * @function modifyPassword
   * @description Update password
   * @param {Object} payload
   * @param {string} payload.password
   * @memberof accountService
   * @inner
   */
  modifyPassword: payload => axios.put('/auth/password', payload),

}


/**
 * @module oauthService
 * @description Service used for managing session tokenization.
 */
export const oauthService = {
  /**
   * @function handleLogin
   * @description Endpoint for retreiving OAuth2 tokens from new login.
   * @param {Object} payload
   * @param {string} client_id
   * @param {string} username
   * @param {string} password
   * @param {string} client_secret
   * @param {string} grant_type
   * @memberof oauthService
   * @inner
   */
  handleLogin: ({ client_id, username, password, client_secret, grant_type }) => (
    axios.post(
      '/oauth/token',
      qs.stringify({ client_id, username, password, client_secret, grant_type }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
  ),

  /**
   * @function handleToken
   * @description Endpoint for retreiving/refreshing OAuth2 tokens.
   * @todo Understand refreshing better from Arthur.
   * @memberof oauthService
   * @inner
   */
  handleTokenRefresh: () => {
    const refresh_token = sessionStorage.getItem('refresh_token')

    return axios.post(
      '/oauth/token',
      qs.stringify({ refresh_token, grant_type: 'refresh_token' }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
  },

  /**
   * @function revokeToken
   * @description Endpoint for revoking OAuth2 tokens.
   * @memberof oauthService
   * @inner
   */
  revokeToken: () => axios.post(
    '/oauth/revoke',
    qs.stringify({ client_id: 'client_id', token: sessionStorage.getItem('refresh_token') }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  ),

  handleSetSessionStorage: (oauthData) => {
    // Clear then set the sessionStorage with all OAuth2 information and setup common headers.
    Object.keys(oauthData).map(key => (sessionStorage.setItem(key, oauthData[key])))
    axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('access_token')}`
  },

  handleClearSessionStorage: () => (
    sessionStorage.clear()
  ),

  handleRetrieveOauthSession: () => ({
    refresh_token: sessionStorage.getItem('refresh_token'),
    expires_in: sessionStorage.getItem('expires_in'),
  }),

  handleRetrieveCurrentUser: (isParent, storeUser) => {
    if (isParent) {
      return parentAccountService
        .getParent()
        .then(({ data }) => storeUser(data))
        .catch(error => log.error(error))
    }

    return childAccountService
      .getChild()
      .then(({ data }) => storeUser(data))
      .catch(error => log.error(error))
  },
}
