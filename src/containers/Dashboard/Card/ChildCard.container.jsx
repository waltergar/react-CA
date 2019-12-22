import ChildCard from 'containers/Dashboard/Card/ChildCard.component'
import cardsConnector from 'store/cards/connector'
import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'

export default globalsConnector(userConnector(cardsConnector(ChildCard)))
