import { format, isDate, isValid } from 'date-fns'

export const formatDate = (dateString, dateFormat = null) => {
  const dateFormatString = dateFormat || 'MMM D, YYYY'
  const valid = dateString !== null && isDate(new Date(dateString)) && isValid(new Date(dateString))
  return valid ? format(dateString, dateFormatString) : 'N/A'
}

export const formatTimestamp = (dateString) => {
  const valid = dateString !== null && isDate(new Date(dateString))
  return valid ? format(dateString, 'x') : format(new Date(), 'x')
}
