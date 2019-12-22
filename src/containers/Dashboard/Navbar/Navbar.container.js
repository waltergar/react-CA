import { withRouter } from 'react-router-dom'

import usersConnector from 'store/currentUser/connector'
import globalsConnector from 'store/globals/connector'
import Navbar from 'containers/Dashboard/Navbar/Navbar.component'


export default withRouter(globalsConnector(usersConnector(Navbar)))
