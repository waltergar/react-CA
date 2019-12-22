import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import createCardConnector from 'store/createCard/connector'
import Profile from 'containers/Dashboard/Profile/Profile.component'

export default globalsConnector(userConnector(createCardConnector(Profile)))
