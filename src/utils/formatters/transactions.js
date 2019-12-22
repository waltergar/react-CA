import get from 'lodash/get'
import { formatDate, formatTimestamp } from 'utils/formatters/dates'
import { naturalSortByDescending } from 'utils/formatters/sorting'

export const transactionsFormatter = {
  normalizeData: transactions => naturalSortByDescending(transactions.map(transaction => ({
    id: get(transaction, 'id'),
    vendorId: get(transaction, 'transaction_id'),
    amount: `$${get(transaction, 'amount')}`,
    status: get(transaction, 'status'),
    type: get(transaction, 'transaction_type'),
    cardId: get(transaction, 'to_card_id'),
    cardHolder: `${get(transaction, 'to_card_first_name', '')} ${get(transaction, 'to_card_last_name', '')}`,
    purchase_timestamp: formatTimestamp(get(transaction, 'transaction_date')),
    date: {
      purchase: formatDate(get(transaction, 'transaction_date')),
      posted: formatDate(get(transaction, 'posted_date')),
    },
    merchant: {
      info: get(transaction, 'merchant_info'),
      name: get(transaction, 'merchant_name'),
    },
    chore: get(transaction, 'chore'),
  })), 'purchase_timestamp'),
}
