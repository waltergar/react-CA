import createCardConnector from 'store/createCard/connector'
import cardsConnector from 'store/cards/connector'
import CreateSubCard from 'containers/Dashboard/CreateCard/CreateCardSteps/CreateSubCard.component'

export default createCardConnector(cardsConnector(CreateSubCard))
