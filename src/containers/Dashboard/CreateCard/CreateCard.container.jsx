import CreateCardContainer from 'containers/Dashboard/CreateCard/CreateCard.component'
import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import createCardConnector from 'store/createCard/connector'

export default globalsConnector(userConnector(createCardConnector(CreateCardContainer)))
