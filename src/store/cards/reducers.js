import { handleActions } from 'redux-actions'
import { cardsFormatter } from 'utils/formatters/cards'
import image1 from 'assets/images/cc-1.png'
import image2 from 'assets/images/cc-2.png'
import image3 from 'assets/images/cc-3.png'
import image4 from 'assets/images/cc-4.png'
import image5 from 'assets/images/cc-5.png'
import image6 from 'assets/images/cc-6.jpg'

export const defaultState = {
  cards: [],
  cardImages: {
    '#eeffaa': { color: 'rgba(235, 142, 169, 0.9)', imageUrl: image3, decomm: true },
    blueSplash: { id: 'blueSplash', color: 'rgba(109, 211, 222, 0.9)', imageUrl: image1 },
    pinkRocker: { id: 'pinkRocker', color: 'rgba(235, 142, 169, 0.9)', imageUrl: image2 },
    cityMaze: { id: 'cityMaze', color: 'rgba(185, 146, 113, 0.9)', imageUrl: image3 },
    coffeePot: { id: 'coffeePot', color: 'rgba(172, 172, 172, 0.9)', imageUrl: image4 },
    yellowCanvas: { id: 'yellowCanvas', color: '#eeffaa', imageUrl: image5 },
    gummyWorms: { id: 'gummyWorms', color: '#eeffaa', imageUrl: image6 },
  },
}

const reducer = handleActions({
  'CARDS/STORE_NON_PPI_CARDS': (state, { payload: cards }) => ({
    ...state,
    cards: cardsFormatter.normalizeData(cards),
  }),
}, defaultState)

export default reducer
