import React, { Component } from 'react'

const withResponsiveComponent = WrappedComponent => (
  class Responsive extends Component {
    state = {
      isMobile: false,
    }

    componentDidMount() {
      this.updateDimensions()
      window.addEventListener('resize', this.updateDimensions)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions)
    }

    updateDimensions = () => {
      const isMobile = window.innerWidth < 768
      this.setState(prevState => ({ ...prevState, isMobile }))
    }

    render() {
      return <WrappedComponent isMobile={this.state.isMobile} {...this.props} />
    }
  }
)

export default withResponsiveComponent
