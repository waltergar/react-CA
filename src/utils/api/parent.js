import axios from 'axios'
import { toGlobalId } from 'utils/formatters/global'

/**
 * @module accountService
 * @description Account service for modifying and creating accounts.
 */
export const accountService = {
  /**
   * @function createParent
   * @description Creates a parent primary account.
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   * @param {string} payload.first_name
   * @param {string} payload.last_name
   * @param {string} payload.phone
   * @param {string} payload.parent_role
   * @memberof accountService
   * @inner
   */
  createParent: payload => axios.post(
    '/parent',
    payload,
    { headers: { Authorization: `Basic ${toGlobalId('client_id', 'client_secret')}` } },
  ),

  /**
   * @function getParent
   * @description Gets the parent's account details.
   * @memberof accountService
   * @inner
   */
  getParent: () => axios.get('/parent'),

  /**
   * @function registerParentAkimbo
   * @description Registers the parent account with Akimbo.
   * @param {Object} payload
   * @param {string} payload.first_name
   * @param {string} payload.middle_name
   * @param {string} payload.last_name
   * @param {string} payload.suffix
   * @param {string} payload.dob
   * @param {string} payload.ssn
   * @param {Object} payload.address
   * @param {string} payload.address.street_address
   * @param {string} payload.address.city
   * @param {string} payload.address.state
   * @param {string} payload.address.zipcode
   * @memberof accountService
   * @inner
   */
  registerParentAkimbo: payload => axios.post('/parent/provider', payload),

  /**
   * @function modifyParentProfile
   * @description Change the parent's phone number and address.
   * @param {string} childId
   * @param {Object} payload
   * @param {string} payload.phone
   * @param {Object} payload.address
   * @param {string} payload.address.street_address
   * @param {string} payload.address.city
   * @param {string} payload.address.state
   * @param {string} payload.address.zipcode
   * @memberof accountService
   * @inner
   */
  modifyParentProfile: payload => axios.put('/parent', payload),

  /**
   * @function modifyParentEmail
   * @description Change the parent's email.
   * @todo QUESTION FOR ARTHUR. This is pending an email confirmation,
   *       hence is there something that tells UI pending confirmation?
   * @param {string} childId
   * @param {Object} payload
   * @param {string} payload.email
   * @memberof accountService
   * @inner
   */
  modifyParentEmail: payload => axios.put('/parent/email', payload),

  /**
   * @function deleteParent
   * @description Deletes the parent's account.
   * @memberof accountService
   * @inner
   */
  deleteParent: () => axios.delete('/parent'),

  /**
   * @function createChild
   * @description Creates a child subcard account.
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.first_name
   * @param {string} payload.last_name
   * @param {string} payload.dob
   * @param {string} payload.phone
   * @param {string} payload.gender
   * @param {integer} payload.amount
   * @param {string} payload.image
   * @memberof accountService
   * @inner
   */
  createChild: payload => axios.post('/parent/children', payload),

  /**
   * @function reinviteChild
   * @description Reinvite the child with new or previously used email address.
   * @param {string} childId
   * @param {Object} payload
   * @param {string} payload.email
   * @memberof accountService
   * @inner
   */
  reinviteChild: (childId, payload) => axios.post(`/parent/children/${childId}/reinvite`, payload),
}


/**
 * @module cardsService
 * @description Parent chore service for viewing, pausing, and unpausing subcards.
 */
export const cardsService = {
  /**
   * @function getCards
   * @description Gets all subcards for the current parent.
   * @memberof cardsService
   * @inner
   */
  getCards: () => axios.get('/parent/cards'),

  /**
   * @function pauseCard
   * @description Pauses a subcard.
   * @param {string} cardId
   * @memberof cardsService
   * @inner
   */
  pauseCard: cardId => axios.post(`/parent/cards/${cardId}/pause`),

  /**
   * @function unpauseCard
   * @description Unpauses a subcard.
   * @param {string} cardId
   * @memberof cardsService
   * @inner
   */
  unpauseCard: cardId => axios.delete(`/parent/cards/${cardId}/pause`),

  /**
   * @function addCardAvatar
   * @description Add a subcard avatar.
   * @param {string} cardId
   * @param {Object} payload
   * @memberof cardsService
   * @inner
   */
  addCardAvatar: (cardId, payload) => axios.post(`/parent/cards/${cardId}/avatar`, payload, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }),

  /**
   * @function deleteCardAvatar
   * @description Delete a subcard avatar.
   * @param {string} cardId
   * @memberof cardsService
   * @inner
   */
  deleteCardAvatar: cardId => axios.delete(`/parent/cards/${cardId}/avatar`),
}


/**
 * @module choresService
 * @description Parent chore service for viewing, modifying, and creating chores.
 */
export const choresService = {
  /**
   * @function getChores
   * @description Gets all chores for the current parent.
   * @memberof choresService
   * @inner
   */
  getChores: () => axios.get('/parent/chores'),

  /**
   * @function createChore
   * @description Creates a chore linked to a subcard (child account).
   * @param {string} cardId
   * @param {Object} payload
   * @param {string} payload.name
   * @param {integer} payload.rate
   * @memberof choresService
   * @inner
   */
  createChore: (cardId, { name, rate }) => axios.post(`/parent/cards/${cardId}/chores`, { name, rate }),

  /**
   * @function deleteChore
   * @description Delete a single chore.
   * @param {string} choreId
   * @memberof choresService
   * @inner
   */
  deleteChore: choreId => axios.delete(`/parent/chores/${choreId}`),
}


/**
 * @module transactionsService
 * @description Parent transaction service for viewing, approving, and declining transactions.
 */
export const transactionsService = {
  /**
   * @function getTransactions
   * @description Gets all transactions for the current parent.
   * @memberof transactionsService
   * @inner
   */
  getTransactions: () => axios.get('/parent/transactions'),

  /**
   * @function approveTransaction
   * @description Approves a single child transaction.
   * @param {string} transactionId
   * @memberof transactionsService
   * @inner
   */
  approveTransaction: transactionId => axios.post(`/parent/transactions/${transactionId}/accept`),

  /**
   * @function declineTransaction
   * @description Declines a single child transaction.
   * @param {string} transactionId
   * @memberof transactionsService
   * @inner
   */
  declineTransaction: transactionId => axios.post(`/parent/transactions/${transactionId}/decline`),

  /**
   * @function getStatements
   * @description get statements.
   * @memberof transactionsService
   * @inner
   */
  getStatements: () => axios.get('/parent/statements'),

  /**
   * @function downloadStatements
   * @description download monthly transactions.
   * @param {string} transactionId
   * @memberof transactionsService
   * @inner
   */
  downloadStatements: transactionId => axios.get(
    `/parent/statements/${transactionId}`,
    { responseType: 'blob',
      headers: {
        Accept: 'application/pdf',
      } },
  ),
}


/**
 * @module bankAccountService
 * @description Parent transaction service for viewing, approving, and declining transactions.
 */
export const bankAccountService = {
  /**
   * @function getAccount
   * @description Gets parent's bank account details.
   * @memberof bankAccountService
   * @inner
   */
  getAccount: () => axios.get('/parent/bankaccount'),

  /**
   * @function linkAccount
   * @description Links the parent's bank account to the parent's user account from Plaid API.
   * @param {Object} payload
   * @param {string} payload.public_token - Returned from Plaid API.
   * @param {string} payload.account_type - Returned from Plaid API.
   * @memberof bankAccountService
   * @inner
   */
  linkAccount: payload => axios.post('/parent/bankaccount', payload),

  /**
   * @function verifyLinkedAccount
   * @description Further verifies Plaid API response.
   * @param {Object} payload
   * @param {string} payload.routing
   * @param {string} payload.account
   * @param {string} payload.name
   * @param {string} payload.last_four
   * @memberof bankAccountService
   * @inner
   */
  verifyLinkedAccount: payload => axios.put('/parent/bankaccount', payload),

  /**
   * @function deleteAccount
   * @description Deletes the parent bank account on record.
   * @memberof bankAccountService
   * @inner
   */
  deleteAccount: () => axios.delete('/parent/bankaccount'),
}
