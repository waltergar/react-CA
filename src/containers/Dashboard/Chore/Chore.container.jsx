import globalConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import cardConnector from 'store/cards/connector'
import ChoreContainer from 'containers/Dashboard/Chore/Chore.component'


export default cardConnector(globalConnector(userConnector(ChoreContainer)))
