import React from 'react'
import { shallow } from 'enzyme'

import {{=it.name.upperCamelCase}} from '../{{=it.name.upperCamelCase}}'


describe('<{{=it.name.upperCamelCase}} />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<{{=it.name.upperCamelCase}} />)
    expect(wrapper).toMatchSnapshot()
  })
})
