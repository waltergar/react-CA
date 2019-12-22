export const getCards = state => state.cards.cards

export const getCardImages = state => state.cards.cardImages

export const getCardById = (state, id) => {
  const cardObject = state.cards.cards.filter(card => card.id === id)
  return cardObject.length === 1 ? cardObject[0] : {}
}

export const getCardImageByCardId = (state, id) => {
  const card = getCardById(state, id)
  const cardImage = card && card.image ? state.cards.cardImages[card.image] : {}
  return { card, cardImage }
}
