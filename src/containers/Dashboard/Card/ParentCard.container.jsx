import ParentCard from 'containers/Dashboard/Card/ParentCard.component'
import cardsConnector from 'store/cards/connector'
import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import createCardConnector from 'store/createCard/connector'

export default globalsConnector(userConnector(createCardConnector(cardsConnector(ParentCard))))
