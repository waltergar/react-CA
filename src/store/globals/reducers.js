import { handleActions } from 'redux-actions'

export const defaultState = {
  header: {
    isTransparent: true,
    homepageNumber: 0,
    isPageLoading: false,
    transactions: [],
  },
}

const reducer = handleActions({
  'GLOBALS/HEADER_IS_TRANSPARENT': (state, { payload: isTransparent }) => ({
    ...state,
    header: {
      ...state.header,
      isTransparent,
    },
  }),
  'GLOBALS/CHANGE_PAGE_NUMBER': (state, { payload: homepageNumber }) => ({
    ...state,
    header: {
      ...state.header,
      homepageNumber,
    },
  }),
  'GLOBALS/PAGE_LOADING': (state, { payload: isPageLoading }) => ({
    ...state,
    header: {
      ...state.header,
      isPageLoading,
    },
  }),
  'GLOBALS/STORE_TRANSACTIONS': (state, { payload: transactions }) => ({
    ...state,
    header: {
      ...state.header,
      transactions,
    },
  }),
}, defaultState)

export default reducer
