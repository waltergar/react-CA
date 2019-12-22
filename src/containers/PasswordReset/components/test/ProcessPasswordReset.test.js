import React from 'react'
import { shallow } from 'enzyme'

import ProcessPasswordReset from '../ProcessPasswordReset'

const componentProps = {
  onSubmit: jest.fn(),
  loading: false,
}

describe('<ProcessPasswordReset />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ProcessPasswordReset {...componentProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('does not allow submission when loading prop is true', () => {
    const testProps = { ...componentProps, loading: true }
    const wrapper = shallow(<ProcessPasswordReset {...testProps} />)
    const button = wrapper.find('Button')
    expect(button).toBeDisabled()
  })

  it('does not allow submission when passwords do not match', () => {
    const wrapper = shallow(<ProcessPasswordReset {...componentProps} />)
    const button = wrapper.find('Button')

    wrapper.setState({ password: 'TobyMaguire', verifiedPassword: 'KirstenDunst' })
    wrapper.update()

    expect(button).toBeDisabled()
  })

  it('sends a valid password to the onSubmit callback', () => {
    const wrapper = shallow(<ProcessPasswordReset {...componentProps} />)
    const button = wrapper.find('Button')

    wrapper.setState({ password: 'TobyMaguireIsSpidey', verifiedPassword: 'TobyMaguireIsSpidey' })
    wrapper.update()
    button.simulate('click')

    expect(componentProps.onSubmit).toHaveBeenCalledWith('TobyMaguireIsSpidey')
  })
})
