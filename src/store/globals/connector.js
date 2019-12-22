import { connect } from 'react-redux'

import {
  isTransparentHeader,
  handleChangeHomepageNumber,
  handlePageLoading,
  storeTransactions,
} from 'store/globals/actions'
import {
  isTransparentHeader as checkIsTransparentHeader,
  homepageNumber as getHomepageNumber,
  isPageLoading as checkIsPageLoading,
  getTransactions,
} from 'store/globals/selectors'

export const mapStateToProps = state => ({
  isTransparentHeader: checkIsTransparentHeader(state),
  homepageNumber: getHomepageNumber(state),
  isPageLoading: checkIsPageLoading(state),
  transactions: getTransactions(state),
})

export const mapDispatchToProps = dispatch => ({
  toggleHeaderTransparency: isTransparent => dispatch(isTransparentHeader(isTransparent)),
  handleChangeHomepageNumber: pageNumber => dispatch(handleChangeHomepageNumber(pageNumber)),
  handlePageLoading: isLoading => dispatch(handlePageLoading(isLoading)),
  storeTransactions: transactions => dispatch(storeTransactions(transactions)),
})

const globalsConnector = Component => connect(mapStateToProps, mapDispatchToProps)(Component)

export default globalsConnector
