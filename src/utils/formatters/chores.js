import get from 'lodash/get'
import { formatDate, formatTimestamp } from 'utils/formatters/dates'
import { naturalSortByDescending } from 'utils/formatters/sorting'

export const choresFormatter = {
  normalizeData: chores => naturalSortByDescending(chores.map(chore => ({
    id: get(chore, 'id'),
    cardId: get(chore, 'card_id'),
    created: formatDate(get(chore, 'created_at')),
    created_timestamp: formatTimestamp(get(chore, 'created_at')),
    name: get(chore, 'name'),
    rate: `$${get(chore, 'rate')}`,
  })), 'created_timestamp'),
}
