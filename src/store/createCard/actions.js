import { createAction } from 'redux-actions'

export const storeFirstName = createAction('CREATECARD/SUBCARD/STORE_FIRSTNAME')
export const storeDob = createAction('CREATECARD/SUBCARD/STORE_DOB')
export const storeEmail = createAction('CREATECARD/SUBCARD/STORE_EMAIL')
export const storeGender = createAction('CREATECARD/SUBCARD/STORE_GENDER')
export const storeAmount = createAction('CREATECARD/SUBCARD/STORE_AMOUNT')
export const storeSelectedCard = createAction('CREATECARD/SUBCARD/STORE_SELECTED_CARD')
export const storeAvatarImage = createAction('CREATECARD/SUBCARD/STORE_AVATAR')
export const storeAvatarFile = createAction('CREATECARD/SUBCARD/STORE_AVATAR_FILE')

export const togglePlaidVisibility = createAction('CREATECARD/PLAID/TOGGLE_VISIBILITY')
export const storePlaidToken = createAction('CREATECARD/PLAID/STORE_PLAID_TOKEN')
export const storePlaidMeta = createAction('CREATECARD/PLAID/STORE_PLAID_META')

export const storeParentDob = createAction('CREATECARD/PARENT_VERIFICATION/STORE_DOB')
export const storeParentSsn = createAction('CREATECARD/PARENT_VERIFICATION/STORE_SSN')
export const storeParentFullName = createAction('CREATECARD/PARENT_VERIFICATION/STORE_FULLNAME')
export const storeParentPhone = createAction('CREATECARD/PARENT_VERIFICATION/STORE_PHONE')
export const storeParentAddress = createAction('CREATECARD/PARENT_VERIFICATION/STORE_ADDRESS')

export const flushCreateCardStore = createAction('CREATECARD/FLUSH_STORE')
