import get from 'lodash/get'
import { formatDate } from 'utils/formatters/dates'

const DEFAULT_VALUE = ''


const maskAccountNumberSpacing = (accountNumber) => {
  const maskedAccountNumber = []
  const seperatorCount = 4

  for (let i = 0; i < accountNumber.length; i += seperatorCount) {
    maskedAccountNumber.push(accountNumber.substr(i, seperatorCount))
  }

  return maskedAccountNumber.join(' ')
}


export const formatAccountNumber = (detailed, accountNumber) => {
  if (detailed) return accountNumber.length === 16 ? maskAccountNumberSpacing(accountNumber) : ''
  return accountNumber.length === 16 ? accountNumber.slice(12) : accountNumber
}


export const cardsFormatter = {
  normalizeData: cards => cards.map(card => ({
    id: get(card, 'id'),
    status: get(card, 'status'),
    image: get(card, 'image'),
    emoji: get(card, 'emoji'),
    avatar: get(card, 'child.avatar_url') || DEFAULT_VALUE,
    cardHolder: {
      id: get(card, 'child.id', ''),
      dob: get(card, 'child.dob') || DEFAULT_VALUE,
      email: get(card, 'child.email') || DEFAULT_VALUE,
      gender: get(card, 'child.gender') || DEFAULT_VALUE,
      firstName: get(card, 'child.first_name', ''),
      lastName: get(card, 'child.last_name', ''),
      fullName: `${get(card, 'child.first_name', '')} ${get(card, 'child.last_name', '')}`,
      phone: get(card, 'child.phone') || DEFAULT_VALUE,
      status: get(card, 'child.status') || DEFAULT_VALUE,
    },
    details: {
      availableCredit: `$${get(card, 'available_credit', '0.00')}`,
      currentBalance: `$${get(card, 'current_balance', '0.00')}`,
      creditLimit: `$${get(card, 'total_credit_limit', '0.00')}`,
      cvc: get(card, 'cvc', '000'),
      cvv: get(card, 'cvv', '000'),
      accountNumber: get(card, 'number', '0000000000000000'),
      dueDate: formatDate(get(card, 'payment_due.minimum_due_date')),
      expirationDate: formatDate(get(card, 'exp_date')),
      minimumDue: get(card, 'payment_due.minimum_due') || '0.00',
      fundedBy: get(card, 'funded_by') || DEFAULT_VALUE,
    },
  })),
  cleanseData: cards => cards.map(card => ({
    id: get(card, 'id'),
    status: get(card, 'status'),
    image: get(card, 'image'),
    avatar: get(card, 'child.avatar_url') || DEFAULT_VALUE,
    cardHolder: {
      id: get(card, 'child.id', ''),
      firstName: get(card, 'child.first_name', ''),
      lastName: get(card, 'child.last_name', ''),
      fullName: `${get(card, 'child.first_name', '')} ${get(card, 'child.last_name', '')}`,
    },
  })),
}

