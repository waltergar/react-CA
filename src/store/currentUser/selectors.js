import get from 'lodash/get'

export const ROLES = {
  ROLE_PARENT: 'parent',
  ROLE_CHILD: 'child',
}

export const getProfile = state => state.currentUser.profile
export const getParentRole = state => state.currentUser.profile.parent_role
export const isAuthenticated = state => state.currentUser.permissions.isAuthenticated
export const isRegistered = state => state.currentUser.profile.registered_at_provider
export const isParent = state => state.currentUser.permissions.role === ROLES.ROLE_PARENT
export const isChild = state => state.currentUser.permissions.role === ROLES.ROLE_CHILD
export const bankAccount = state => get(state, 'currentUser.profile.bank_account')
export const hasLinkedBankAccount = state => !!get(state, 'currentUser.profile.bank_account.status')
