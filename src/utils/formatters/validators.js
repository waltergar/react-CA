import { formatDate } from 'utils/formatters/dates'

const ALPHA_ONLY_REGEX = /^[a-zA-Z-]*$/
const ALPHA_AND_SPACES_REGEX = /^[a-zA-Z\s]*$/
const FIRST_LAST_REGEX = /^[a-zA-Z ,.'-]+$/i
const NUMBERS_ONLY_REGEX = /^(\d*\.)?\d+$/
const STREET_ADDRESS_REGEX = /^[a-z A-Z0-9.,/-]*$/
const CITY_REGEX = /^[a-z A-Z0-9-]*$/
const STATE_REGEX = /^[a-zA-Z-]{2}$/
const ZIPCODE_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/
const EMAIL_REGEX = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9.\-_]+$/
const TELEPHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/
// const DOB_REGEX = /^(\d\d\/\d\d\/\d\d\d\d)$/
const DOB_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[0-1])\/(19[0-8][0-9]|199[0-9]|20[01][0-9]|2020)$/g
const SSN_REGEX = /^(\d{3}-\d{2}-\d{4})$/


const API_MIN_STRING_LENGTH = 1
const API_MAX_STRING_LENGTH = 80
const API_MAX_NAME_LENGTH = 60
const API_MIN_VALUE = 0.01

// TODO: PRODUCTION, this must go to a valid minimum load value.
const SUBCARD_MIN_VALUE = 0.00

export const masks = {
  telephone: '999-999-9999',
  dob: '99/99/9999',
  ssn: '999-99-9999',
  zipCode: '99999',
  accountNumber: '9999 9999 9999 9999',
}

export const cleansers = {
  telephone: value => value.replace(/[^0-9]+/g, ''),
  dob: dob => formatDate(dob, 'YYYY-MM-DD'),
}

export const validators = {
  // GLOBAL VALIDATORS (Applicable in many places)
  globals: {
    name: [
      { regex: ALPHA_ONLY_REGEX, error: { level: 3, message: 'First name only!' } },
      { minLength: API_MIN_STRING_LENGTH, error: { level: 3, message: 'Hmm, your name is seems to be too short!' } },
      { maxLength: API_MAX_NAME_LENGTH, error: { level: 3, message: 'Bummer, your name is too long!' } },
    ],
    optionalName: [
      { regex: ALPHA_ONLY_REGEX, error: { level: 3, message: 'Letters only!' } },
      { maxLength: API_MAX_NAME_LENGTH, error: { level: 3, message: 'Bummer, your name is too long!' } },
    ],
    email: [{ regex: EMAIL_REGEX, error: { level: 3, message: 'Please enter a valid email address!' } }],
    firstLastOnly: [
      { regex: FIRST_LAST_REGEX, error: { level: 3, message: 'Please enter only first and last name!' } },
      { limitCharacter: ' ', limit: 1, error: { level: 3, message: 'There should only be one space in between your first and last name!' } },
      { mandatoryCharacter: ' ', minPosition: 1, error: { level: 3, message: 'Please enter a first and last name!' } },
    ],
    maleOrFemale: [{ regex: /^(female|male)$/, error: { level: 3, message: 'You must indicate male or female!' } }],
    streetAddress: [{ regex: STREET_ADDRESS_REGEX, error: { level: 3, message: 'You must enter a valid street address!' } }],
    city: [{ regex: CITY_REGEX, error: { level: 3, message: 'You must enter a valid city!' } }],
    state: [{ regex: STATE_REGEX, error: { level: 3, message: 'You must enter a valid state!' } }],
    zipCode: [{ regex: ZIPCODE_REGEX, error: { level: 3, message: 'You must enter a valid zip code!' } }],
    phoneNumber: [{ regex: TELEPHONE_REGEX, error: { level: 3, message: 'Enter a valid telephone number' } }],
    dob: [{ regex: DOB_REGEX, error: { level: 3, message: 'Enter a valid date' } }],
    ssn: [{ regex: SSN_REGEX, error: { level: 3, message: 'Enter a valid ssn' } }],
  },

  // CUSTOM VALIDATORS (Specific messaging, validation, etc)
  custom: {
    signUp: {
      dadOrMom: [{ regex: /(dad{1})|(mom{1})/, error: { level: 3, message: 'You must indicate if you are dad or mom!' } }],
    },
    // CHORES FORMS (Parent /dashboard/create-chore)
    chores: {
      name: [
        { minLength: API_MIN_STRING_LENGTH, error: { level: 3, message: 'Your chore name is too short!' } },
        { maxLength: API_MAX_STRING_LENGTH, error: { level: 3, message: 'Your chore name is too long!' } },
        { regex: ALPHA_AND_SPACES_REGEX, error: { level: 3, message: 'Your chore name should only have letters!' } },
      ],
      rate: [
        { minValue: API_MIN_VALUE, error: { level: 3, message: 'Your chore rate should be at least $0.01!' } },
        { regex: NUMBERS_ONLY_REGEX, error: { level: 3, message: 'Please enter only a dollar amount.' } },
      ],
    },

    // CREATE SUBCARD FORMS (Parent /dashboard/create-card)
    cards: {
      subcard: {
        rate: [
          { minValue: SUBCARD_MIN_VALUE, error: { level: 3, message: `You must load at least $${SUBCARD_MIN_VALUE.toString()}` } },
          { minLength: 1, error: { level: 3, message: 'Your amount is too short!' } },
        ],
      },
      bank: [{ }],
      parentVerification: [{ }],
    },
  },
}
