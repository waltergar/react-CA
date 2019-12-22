import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import FirstTimeComponent from 'containers/Dashboard/FirstTime/FirstTime.component'

export default globalsConnector(userConnector(FirstTimeComponent))
