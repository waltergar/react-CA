import React from 'react'
import { shallow } from 'enzyme'

import CreateCard from '../CreateCard.component'

const componentProps = {
  isRegistered: false,
  hasLinkedBankAccount: false,
  getCreateSubcardForm: () => {},
  getLinkPlaidForm: () => {},
  getParentVerificationForm: () => {},
  getCardAvatar: () => {},
  toggleHeaderTransparency: () => {},
}

describe('<CreateCard />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CreateCard {...componentProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
