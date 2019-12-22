import { createAction } from 'redux-actions'

export const isTransparentHeader = createAction('GLOBALS/HEADER_IS_TRANSPARENT')
export const handleChangeHomepageNumber = createAction('GLOBALS/CHANGE_PAGE_NUMBER')
export const handlePageLoading = createAction('GLOBALS/PAGE_LOADING')
export const storeTransactions = createAction('GLOBALS/STORE_TRANSACTIONS')
