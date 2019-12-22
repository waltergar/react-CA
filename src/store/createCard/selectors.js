import get from 'lodash/get'
import { cleansers } from 'utils/formatters/validators'

export const getFirstName = state => state.createCard.subCard.firstName
export const getDob = state => state.createCard.subCard.dob
export const getEmail = state => state.createCard.subCard.email
export const getGender = state => state.createCard.subCard.gender
export const getAmount = state => state.createCard.subCard.amount
export const getSelectedCard = state => state.createCard.subCard.selectedCard
export const getAvatarImage = state => state.createCard.subCard.avatarImage
export const getAvatarFile = state => state.createCard.subCard.avatarFile

export const isPlaidVisible = state => state.createCard.plaid.visible
export const getPlaidToken = state => state.createCard.plaid.token
export const getPlaidMeta = state => state.createCard.plaid.meta
export const getPlaidSelectedAccount = state => get(getPlaidMeta(state), 'account.mask')
export const getPlaidAccountType = (state) => {
  const meta = getPlaidMeta(state)
  const accountType = get(meta, 'account.subtype')
  return accountType === 'checking' || accountType === 'savings' ? accountType : null
}
export const getPlaidInstitutionName = state => get(getPlaidMeta(state), 'institution.name')
export const getPlaidInstitutionId = state => get(getPlaidMeta(state), 'institution.institution_id')

export const getParentDob = state => state.createCard.parentVerification.dob
export const getParentSsn = state => state.createCard.parentVerification.ssn
export const getParentFullName = state => state.createCard.parentVerification.fullName
export const getParentPhone = state => state.createCard.parentVerification.phone
export const getParentAddress = state => state.createCard.parentVerification.address

export const getCreateSubcardForm = state => ({
  email: getEmail(state),
  first_name: getFirstName(state),
  dob: cleansers.dob(getDob(state)),
  gender: 'male', // getGender(state),
  amount: Number.parseFloat(getAmount(state)),
  image: '', // getSelectedCard(state),
})

export const getCardAvatar = state => ({
  image: getAvatarImage(state),
  file: getAvatarFile(state),
})

export const getLinkPlaidForm = state => ({
  public_token: getPlaidToken(state),
  account_type: getPlaidAccountType(state),
  selected_account: getPlaidSelectedAccount(state),
  institution_name: getPlaidInstitutionName(state),
  institution_id: getPlaidInstitutionId(state),
})

export const getParentVerificationForm = state => ({
  dob: cleansers.dob(getParentDob(state)),
  ssn: getParentSsn(state),
})
