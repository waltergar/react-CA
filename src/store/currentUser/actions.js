import { createAction } from 'redux-actions'

export const isAuthenticated = createAction('CURRENT_USER/IS_AUTHENTICATED')
export const storeRole = createAction('CURRENT_USER/STORE_ROLE')
export const storeProfile = createAction('CURRENT_USER/STORE_PROFILE')
export const deleteBankAccount = createAction('CURRENT_USER/DELETE_BANK_ACCOUNT')
export const logoutUser = createAction('CURRENT_USER/LOGOUT')
