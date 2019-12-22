import React from 'react'
import { shallow } from 'enzyme'
import Button from '../Button'

const onClick = jest.fn()

describe('<Button />', () => {
  context('should default to the primary button', () => {
    const wrapper = shallow(<Button />)

    it('if it has the primary flag', () => {
      wrapper.setProps({ primary: true })
      expect(wrapper.find('button').hasClass('Button primary')).toBe(true)
    })
    it('has competing flags with the primary flag', () => {
      wrapper.setProps({ primary: true, secondary: true })
      expect(wrapper.setProps('secondary').find('button').hasClass('Button primary')).toBe(true)
    })
  })

  context('should activate the correct class', () => {
    it('if it has the secondary flag', () => {
      const wrapper = shallow(<Button secondary />)
      expect(wrapper.find('button').hasClass('Button secondary')).toBe(true)
    })
    it('if it has the disabled flag', () => {
      const wrapper = shallow(<Button disabled />)
      expect(wrapper.find('button').hasClass('disabled')).toBe(true)
    })
    it('if it has a custom class', () => {
      const wrapper = shallow(<Button className='test' />)
      expect(wrapper.find('button').hasClass('test')).toBe(true)
    })
  })

  it('should have the disabled attribute when disabled prop is true', () => {
    const wrapper = shallow(<Button disabled />)
    expect(wrapper.find('button').prop('disabled')).toBe(true)
  })
  it('should wrap any children', () => {
    const wrapper = shallow(<Button>test123</Button>)
    expect(wrapper.text()).toBe('test123')
  })
  it('call the onClick function passed via props', () => {
    const wrapper = shallow(<Button onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
