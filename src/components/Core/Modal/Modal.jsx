/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Section, { Row, Col } from 'components/Core/Section/Section'
import styles from './Modal.scss'

class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleOnEsc, false)
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleOnEsc, false)
    document.body.style.overflow = 'auto'
  }

  onCloseWrapper = (event) => {
    if (event && event.target && event.target.className && event.target.className.indexOf) {
      const sectionTarget = event.target.className.indexOf('Section')
      const rowTarget = event.target.className.indexOf('mui-row')

      if ((sectionTarget >= 0 || rowTarget >= 0) && this.props.onClose) this.props.onClose()
    }
  }

  handleOnEsc = event => ((event.keyCode === 27 && this.props.onClose) && this.props.onClose())

  render() {
    const { className, children, large, contentClassName } = this.props
    return (
      <div className={classNames(styles.Modal, className)}>
        <div className={styles.overlay} />
        <Section className={styles.section} onClick={this.onCloseWrapper}>
          <Row>
            <Col md='1' lg={large ? '1' : '3'} />
            <Col md='10' lg={large ? '10' : '6'}>
              <div className={classNames(styles.content, contentClassName)}>
                {children}
              </div>
            </Col>
            <Col md='1' lg={large ? '1' : '3'} />
          </Row>
        </Section>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  onClose: PropTypes.func,
  large: PropTypes.bool,
}

Modal.defaultProps = {
  className: '',
  contentClassName: '',
  onClose: null,
  large: false,
}

export default Modal
