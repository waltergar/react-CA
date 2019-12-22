import ParentTransactions from 'containers/Dashboard/Transactions/ParentTransactions.component'
import cardsConnector from 'store/cards/connector'
import globalsConnector from 'store/globals/connector'

export default globalsConnector(cardsConnector(ParentTransactions))
