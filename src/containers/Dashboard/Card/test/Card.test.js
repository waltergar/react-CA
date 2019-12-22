import React from 'react'
import { shallow } from 'enzyme'

import ParentCard from '../ParentCard.component'
import ChildCard from '../ChildCard.component'

const componentProps = {
  toggleHeaderTransparency: () => {},
  storeCards: () => {},
  getCardImageByCardId: () => {},
  handleCardLoading: () => {},
  currentUser: { bank_account: { status: null } },
  transactions: [],
  cards: [],
  togglePlaidVisibility: () => {},
  isMobile: false,
}

describe('<ParentCard />', () => {
  it('renders like a beautiful baked apple pie', () => (
    expect(shallow(<ParentCard {...componentProps} />)).toMatchSnapshot()
  ))
})

describe('<ChildCard />', () => {
  it('renders like a Mr.Softee on a sunny NYC day', () => (
    expect(shallow(<ChildCard {...componentProps} />)).toMatchSnapshot()
  ))
})
