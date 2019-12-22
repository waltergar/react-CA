import axios from 'axios'
import { toGlobalId } from 'utils/formatters/global'


/**
 * @module accountService
 * @description Account service for modifying child account.
 */
export const accountService = {
  /**
   * @function getChild
   * @description Gets current child's account details.
   * @memberof accountService
   * @inner
   */
  getChild: () => axios.get('/child'),

  /**
   * @function registerChild
   * @description Registers the child using token emailed to them.
   * @param {Object} payload
   * @param {string} payload.token
   * @param {string} payload.password
   * @memberof accountService
   * @inner
   */
  registerChild: payload => axios.post(
    '/child',
    payload,
    { headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` } },
  ),

  /**
   * @function modifyChildPhone
   * @description Modifies the child's phone number.
   * @param {Object} payload
   * @param {string} payload.phone
   * @memberof accountService
   * @inner
   */
  modifyChildPhone: payload => axios.put('/child', payload),

  /**
   * @function modifyChildEmail
   * @description Modifies the child's email address.
   * @param {Object} payload
   * @param {string} payload.email
   * @memberof accountService
   * @inner
   */
  modifyChildEmail: payload => axios.put('/child/email', payload),
}


/**
 * @module cardService
 * @description Child card service for viewing and activating their subcard.
 */
export const cardService = {
  /**
   * @function getCard
   * @description Gets all subcards for the current parent.
   * @memberof cardService
   * @inner
   */
  getCard: () => axios.get('/child/card'),

  /**
   * @function activateCard
   * @description Activates a subcard using 16 digit card number.
   * @param {Object} payload
   * @param {string} payload.number - The 16 digit card number.
   * @memberof cardService
   * @inner
   */
  activateCard: payload => axios.post('child/card/activate', payload),
}


/**
 * @module choresService
 * @description Child chore service for viewing chores, and requesting payment.
 */
export const choresService = {
  /**
   * @function getChores
   * @description Gets all chores for the current child.
   * @memberof choresService
   * @inner
   */
  getChores: () => axios.get('/child/chores'),

  /**
   * @function requestPayment
   * @description Requests payment in the amount of the chore selected.
   * @param {string} choreId
   * @memberof choresService
   * @inner
   */
  requestPayment: choreId => axios.post(`/child/chores/${choreId}/pay`),
}


/**
 * @module transactionsService
 * @description Child transaction service for viewing transactions.
 */
export const transactionsService = {
  /**
   * @function getTransactions
   * @description Gets all transactions for the current child.
   * @memberof transactionsService
   * @inner
   */
  getTransactions: () => axios.get('/child/transactions'),
}
