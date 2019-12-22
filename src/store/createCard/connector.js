/* eslint-disable max-len */
import { connect } from 'react-redux'
import * as actions from 'store/createCard/actions'
import * as selectors from 'store/createCard/selectors'


export const mapStateToProps = state => ({
  firstName: selectors.getFirstName(state),
  dob: selectors.getDob(state),
  email: selectors.getEmail(state),
  gender: selectors.getGender(state),
  amount: selectors.getAmount(state),
  selectedCard: selectors.getSelectedCard(state),
  avatarImage: selectors.getAvatarImage(state),
  avatarFile: selectors.getAvatarFile(state),

  isPlaidVisible: selectors.isPlaidVisible(state),
  plaidToken: selectors.getPlaidToken(state),
  plaidMeta: selectors.getPlaidMeta(state),

  parentDob: selectors.getParentDob(state),
  parentSsn: selectors.getParentSsn(state),
  parentFullName: selectors.getParentFullName(state),
  parentAddress: selectors.getParentAddress(state),
  parentPhone: selectors.getParentPhone(state),

  getCreateSubcardForm: () => selectors.getCreateSubcardForm(state),
  getCardAvatar: () => selectors.getCardAvatar(state),
  getLinkPlaidForm: () => selectors.getLinkPlaidForm(state),
  getParentVerificationForm: () => selectors.getParentVerificationForm(state),
})


export const mapDispatchToProps = dispatch => ({
  storeFirstName: fullName => dispatch(actions.storeFirstName(fullName)),
  storeDob: dob => dispatch(actions.storeDob(dob)),
  storeEmail: email => dispatch(actions.storeEmail(email)),
  storeGender: gender => dispatch(actions.storeGender(gender)),
  storeAmount: amount => dispatch(actions.storeAmount(amount)),
  storeSelectedCard: selectedCard => dispatch(actions.storeSelectedCard(selectedCard)),
  storeAvatarImage: avatarImage => dispatch(actions.storeAvatarImage(avatarImage)),
  storeAvatarFile: avatarFile => dispatch(actions.storeAvatarFile(avatarFile)),

  togglePlaidVisibility: isVisible => dispatch(actions.togglePlaidVisibility(isVisible)),
  storePlaidToken: token => dispatch(actions.storePlaidToken(token)),
  storePlaidMeta: meta => dispatch(actions.storePlaidMeta(meta)),

  storeParentDob: dob => dispatch(actions.storeParentDob(dob)),
  storeParentSsn: ssn => dispatch(actions.storeParentSsn(ssn)),
  storeParentFullName: fullName => dispatch(actions.storeParentFullName(fullName)),
  storeParentPhone: phone => dispatch(actions.storeParentPhone(phone)),
  storeParentAddress: address => dispatch(actions.storeParentAddress(address)),

  flushCreateCardStore: () => dispatch(actions.flushCreateCardStore()),
})


const createCardConnector = Component => connect(mapStateToProps, mapDispatchToProps)(Component)
export default createCardConnector
