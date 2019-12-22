/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgInline from 'react-svg-inline'

import { Row } from 'components/Core/Section/Section'
import chevronIcon from 'assets/images/dashboard/chevron.svg'
import styles from './Accordion.scss'


class Accordion extends Component {
  state = {
    isOpen: false,
  }

  handleToggleAccordion = () => (
    this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
  )

  renderContent = (content, open) => {
    const mappedContent = content.map(contentItem => (
      <p
        key={contentItem.slice(0, 8)}
        className={styles.contentItem}
        dangerouslySetInnerHTML={{ __html: contentItem }}
      />
    ))

    return (
      <Row>
        <div className={classNames(styles.content, { [styles.open]: open })}>{mappedContent}</div>
      </Row>
    )
  }

  render() {
    const { panel, content, open } = this.props

    return (
      // eslint-disable-next-line
      <div className={styles.Accordion} onClick={this.handleToggleAccordion}>
        <Row>
          <div className={styles.panel}>
            {panel}
            {!open &&
              <SvgInline
                className={classNames(styles.icon, { [styles.open]: this.state.isOpen })}
                svg={chevronIcon}
              />
            }
          </div>
        </Row>
        { (this.state.isOpen || open) && this.renderContent(content, open) }
      </div>
    )
  }
}

Accordion.propTypes = {
  panel: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  open: PropTypes.bool,
}
Accordion.defaultProps = {
  open: false,
}

export default Accordion
