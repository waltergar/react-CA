import { connect } from 'react-redux'

import { storeCards } from 'store/cards/actions'
import { getCards, getCardById, getCardImageByCardId, getCardImages } from 'store/cards/selectors'

export const mapStateToProps = state => ({
  cards: getCards(state),
  cardImages: getCardImages(state),
  getCardById: id => getCardById(state, id),
  getCardImageByCardId: id => getCardImageByCardId(state, id),
})

export const mapDispatchToProps = dispatch => ({
  storeCards: cards => dispatch(storeCards(cards)),
})

const cardsConnector = Component => connect(mapStateToProps, mapDispatchToProps)(Component)

export default cardsConnector
