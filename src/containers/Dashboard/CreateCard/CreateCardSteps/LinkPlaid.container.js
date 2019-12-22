import createCardConnector from 'store/createCard/connector'
import userConnector from 'store/currentUser/connector'
import LinkPlaid from 'containers/Dashboard/CreateCard/CreateCardSteps/LinkPlaid.component'

export default userConnector(createCardConnector(LinkPlaid))
