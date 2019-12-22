import React from 'react'
import { shallow } from 'enzyme'

import Profile from '../Profile.component'

const componentProps = {
  toggleHeaderTransparency: jest.fn(),
  isChild: false,
  isRegistered: true,
  bankAccount: null,
  deleteBankAccount: () => {},
  hasLinkedBankAccount: true,
  currentUser: {},
  storeProfile: () => {},
  togglePlaidVisibility: (val) => {},
}

describe('<Profile />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Profile {...componentProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
