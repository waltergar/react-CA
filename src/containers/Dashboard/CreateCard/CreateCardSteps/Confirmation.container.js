import createCardConnector from 'store/createCard/connector'
import cardsConnector from 'store/cards/connector'
import userConnector from 'store/currentUser/connector'
import Confirmation from 'containers/Dashboard/CreateCard/CreateCardSteps/Confirmation.component'

export default createCardConnector(userConnector(cardsConnector(Confirmation)))
