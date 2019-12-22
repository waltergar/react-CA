import React from 'react'
import { shallow } from 'enzyme'

import RequestPasswordReset from '../RequestPasswordReset'

const componentProps = {
  onSubmit: jest.fn(),
  emailSent: false,
  loading: false,
}

describe('<RequestPasswordReset />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RequestPasswordReset {...componentProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('does not allow submission when loading prop is true', () => {
    const testProps = { ...componentProps, loading: true }
    const wrapper = shallow(<RequestPasswordReset {...testProps} />)
    const button = wrapper.find('Button')
    expect(button).toBeDisabled()
  })

  it('does not allow submission when invalid email is supplied', () => {
    const wrapper = shallow(<RequestPasswordReset {...componentProps} />)
    const button = wrapper.find('Button')

    wrapper.setState({ formIsValid: false })
    wrapper.update()

    expect(button).toBeDisabled()
  })

  it('sends a valid email address to the onSubmit callback', () => {
    const wrapper = shallow(<RequestPasswordReset {...componentProps} />)
    const button = wrapper.find('Button')

    wrapper.setState({ formIsValid: true, emailAddress: 'bacon@vegan.com' })
    wrapper.update()
    button.simulate('click')

    expect(componentProps.onSubmit).toHaveBeenCalledWith('bacon@vegan.com')
  })

  it('displays a success page when emailSent prop is true', () => {
    const testProps = { ...componentProps, emailSent: true }
    const wrapper = shallow(<RequestPasswordReset {...testProps} />)
    const text = 'To reset your password, you must click the link sent to your email address.'

    expect(wrapper.find('p').text()).toEqual(text)
  })
})
