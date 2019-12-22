import React from 'react'
import { shallow } from 'enzyme'

import JoinWaitlist from '../JoinWaitlist'


describe('<JoinWaitlist />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<JoinWaitlist />)
    expect(wrapper).toMatchSnapshot()
  })
})
