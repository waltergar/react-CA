import { handleActions } from 'redux-actions'


export const defaultState = {
  subCard: {
    firstName: '',
    dob: '',
    email: '',
    gender: 'Male',
    amount: '',
    selectedCard: null,
    avatarImage: '',
    avatarFile: '',
  },
  plaid: {
    token: '',
    meta: {},
    visible: false,
  },
  parentVerification: {
    dob: '',
    ssn: '',
    fullName: '',
    address: '',
    phone: '',
  },
}


const reducer = handleActions({
  'CREATECARD/FLUSH_STORE': () => defaultState,
  'CREATECARD/SUBCARD/STORE_FIRSTNAME': (state, { payload: firstName }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      firstName,
    },
  }),
  'CREATECARD/SUBCARD/STORE_DOB': (state, { payload: dob }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      dob,
    },
  }),
  'CREATECARD/SUBCARD/STORE_EMAIL': (state, { payload: email }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      email,
    },
  }),
  'CREATECARD/SUBCARD/STORE_GENDER': (state, { payload: gender }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      gender,
    },
  }),
  'CREATECARD/SUBCARD/STORE_AMOUNT': (state, { payload: amount }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      amount,
    },
  }),
  'CREATECARD/SUBCARD/STORE_SELECTED_CARD': (state, { payload: selectedCard }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      selectedCard,
    },
  }),
  'CREATECARD/SUBCARD/STORE_AVATAR': (state, { payload: avatarImage }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      avatarImage,
    },
  }),
  'CREATECARD/SUBCARD/STORE_AVATAR_FILE': (state, { payload: avatarFile }) => ({
    ...state,
    subCard: {
      ...state.subCard,
      avatarFile,
    },
  }),
  'CREATECARD/PLAID/TOGGLE_VISIBILITY': (state, { payload: visible }) => ({
    ...state,
    plaid: {
      ...state.plaid,
      visible,
    },
  }),
  'CREATECARD/PLAID/STORE_PLAID_TOKEN': (state, { payload: token }) => ({
    ...state,
    plaid: {
      ...state.plaid,
      token,
    },
  }),
  'CREATECARD/PLAID/STORE_PLAID_META': (state, { payload: meta }) => ({
    ...state,
    plaid: {
      ...state.plaid,
      meta,
    },
  }),
  'CREATECARD/PARENT_VERIFICATION/STORE_DOB': (state, { payload: dob }) => ({
    ...state,
    parentVerification: {
      ...state.parentVerification,
      dob,
    },
  }),
  'CREATECARD/PARENT_VERIFICATION/STORE_FULLNAME': (state, { payload: fullName }) => ({
    ...state,
    parentVerification: {
      ...state.parentVerification,
      fullName,
    },
  }),
  'CREATECARD/PARENT_VERIFICATION/STORE_PHONE': (state, { payload: phone }) => ({
    ...state,
    parentVerification: {
      ...state.parentVerification,
      phone,
    },
  }),
  'CREATECARD/PARENT_VERIFICATION/STORE_ADDRESS': (state, { payload: address }) => ({
    ...state,
    parentVerification: {
      ...state.parentVerification,
      address,
    },
  }),
  'CREATECARD/PARENT_VERIFICATION/STORE_SSN': (state, { payload: ssn }) => ({
    ...state,
    parentVerification: {
      ...state.parentVerification,
      ssn,
    },
  }),
}, defaultState)


export default reducer
