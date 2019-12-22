import axios from 'axios'
import { toGlobalId } from 'utils/formatters/global'


const authorizationHeader = {
  headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` },
}

/**
 * @module commonService
 * @description Common service for modifying and creating accounts.
 */
export const commonService = {
  /**
   * @function subscribeWaitingList
   * @description Registers the email address to the waitinglist.
   * @param {Object} payload
   * @param {string} payload.email
   * @memberof commonService
   * @inner
   */
  subscribeWaitingList: payload => axios.post('/waitinglist', payload, authorizationHeader),

  /**
   * @function removeWaitingList
   * @description Removes the email address from the waitinglist via a reference code.
   * @param {Object} payload
   * @param {string} payload.ref_code
   * @memberof commonService
   * @inner
   */
  removeWaitingList: payload => axios.delete('/waitinglist', payload, authorizationHeader),

  /**
   * @function contactUs
   * @description Submit the contact form.
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.name
   * @param {string} payload.phone
   * @param {string} payload.message
   * @memberof commonService
   * @inner
   */
  contactUs: payload => axios.post('/contact', payload, authorizationHeader),
}
