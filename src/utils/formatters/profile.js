import get from 'lodash/get'
import { formatDate } from 'utils/formatters/dates'

const DEFAULT_VALUE = ''

export const replaceNullValue = {
  replace: val => ({
    value: val == null || val === 'null' ? '' : val,
  }),
}

export const fullAddressFormatter = {
  normalizeData: address => ({
    fullAddress: `${replaceNullValue.replace(get(address, 'street_address', '')).value} ${replaceNullValue.replace(get(address, 'zipcode', '')).value} ${replaceNullValue.replace(get(address, 'city', '')).value} ${replaceNullValue.replace(get(address, 'state', '')).value}`,
  }),
}

export const phoneFormatter = {
  normalizeData: phone => ({
    phone: (phone && phone !== 'null') ?
      `${phone.substr(0, 3)}-${phone.substr(3, 3)}-${phone.substr(6, 4)}`
      :
      '',
  }),
}

export const profileFormatter = {
  normalizeData: profile => ({
    fullName: `${get(profile, 'first_name', '')} ${get(profile, 'last_name', '')}`,
    email: get(profile, 'email') || DEFAULT_VALUE,
    phone: phoneFormatter.normalizeData(get(profile, 'phone')).phone || DEFAULT_VALUE,
    fullAddress: fullAddressFormatter.normalizeData(get(profile, 'address')).fullAddress,
    street_address: get(profile, 'address.street_address') || DEFAULT_VALUE,
    city: get(profile, 'address.city') || DEFAULT_VALUE,
    state: get(profile, 'address.state') || DEFAULT_VALUE,
    zipcode: get(profile, 'address.zipcode') || DEFAULT_VALUE,
    dob: formatDate(get(profile, 'dob')) || DEFAULT_VALUE,
  }),
}

export const profileCardInfoFormatter = {
  normalizeData: profile => ({
    registered_at_provider: get(profile, 'registered_at_provider') || false,
    subcards_limit_reached: get(profile, 'subcards_limit_reached') || false,
    hasLinkedBankAccount: get(profile, 'bank_account.status') || false,
  }),
}
