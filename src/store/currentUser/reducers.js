import { handleActions } from 'redux-actions'

export const defaultState = {
  cards: [],
  chores: [],
  transactions: [],
  profile: {
    bank_account: null,
  },
  permissions: {
    role: '',
    isAuthenticated: false,
  },
}

const reducer = handleActions({
  'CURRENT_USER/IS_AUTHENTICATED': (state, { payload: isAuthenticated }) => ({
    ...state,
    permissions: {
      ...state.permissions,
      isAuthenticated,
    },
  }),
  'CURRENT_USER/STORE_ROLE': (state, { payload: role }) => ({
    ...state,
    permissions: {
      ...state.permissions,
      role,
    },
  }),
  'CURRENT_USER/STORE_PROFILE': (state, { payload: profile }) => ({
    ...state,
    profile: {
      ...profile,
    },
  }),
  'CURRENT_USER/DELETE_BANK_ACCOUNT': state => ({
    ...state,
    profile: {
      ...state.profile,
      bank_account: null,
    },
  }),
  'CURRENT_USER/LOGOUT': () => ({
    ...defaultState,
  }),
}, defaultState)

export default reducer
