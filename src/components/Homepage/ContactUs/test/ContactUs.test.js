import React from 'react'
import { shallow } from 'enzyme'

import ContactUs from '../ContactUs'


describe('<ContactUs />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ContactUs />)
    expect(wrapper).toMatchSnapshot()
  })
})
