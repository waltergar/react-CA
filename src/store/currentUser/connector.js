import { connect } from 'react-redux'

import {
  isAuthenticated,
  storeRole,
  storeProfile,
  deleteBankAccount,
  logoutUser,
} from 'store/currentUser/actions'
import {
  getProfile,
  getParentRole,
  isAuthenticated as checkIsAuthenticated,
  isRegistered as checkIsRegistered,
  isParent,
  isChild,
  bankAccount,
  hasLinkedBankAccount,
} from 'store/currentUser/selectors'

export const mapStateToProps = state => ({
  currentUser: getProfile(state),
  parentRole: getParentRole(state),
  isAuthenticated: checkIsAuthenticated(state),
  isRegistered: checkIsRegistered(state),
  isParent: isParent(state),
  isChild: isChild(state),
  bankAccount: bankAccount(state),
  hasLinkedBankAccount: hasLinkedBankAccount(state),
})

export const mapDispatchToProps = dispatch => ({
  handleIsAuthenticated: isLoggedIn => dispatch(isAuthenticated(isLoggedIn)),
  storeRole: role => dispatch(storeRole(role)),
  storeProfile: profile => dispatch(storeProfile(profile)),
  deleteBankAccount: () => dispatch(deleteBankAccount()),
  logoutUser: () => dispatch(logoutUser()),
})

const userConnector = Component => connect(mapStateToProps, mapDispatchToProps)(Component)

export default userConnector
