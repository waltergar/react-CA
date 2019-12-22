import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SVGInline from 'react-svg-inline'
import classNames from 'classnames'

import withResponsiveComponent from 'components/Hoc/Responsive/Responsive'
import { Row, Col } from 'components/Core/Section/Section'
import transactionArrow from 'assets/images/dashboard/transaction-arrow.svg'
import styles from './InfoRowHeader.scss'

class InfoRowHeader extends Component {
  state = {
    sortKey: '',
    sortOrder: '',
  }

  componentDidMount() {
    this.handleInitialLoad()
  }

  handleInitialLoad = () => {
    this.setState(
      prevState => ({ ...prevState, sortKey: this.props.sortKey, sortOrder: this.props.sortOrder }),
      () => this.handleSortWrapper(this.state.sortKey, false),
    )
  }

  handleKeyPress = () => {
  }

  handleSortWrapper = (sortKey, changeSortOrder) => {
    const { handleSort } = this.props
    let { sortOrder } = this.state
    if (changeSortOrder) {
      sortOrder = sortOrder === 'asc' && this.state.sortKey === sortKey ? 'desc' : 'asc'
    }
    this.setState(prevState => ({ ...prevState, sortKey, sortOrder }))
    if (handleSort) {
      handleSort(sortKey, sortOrder)
    }
  }

  renderColumns = () => {
    const { columns, isMobile } = this.props
    const { sortOrder, sortKey } = this.state

    return columns.map((column, index) => {
      const isVisible = (!isMobile && !column.mobile) || column.mobile
      if (!isVisible) return null

      return (
        <Col
          key={column.name}
          xs={column.mobile ? column.mobileWidth : null}
          md={column.width}
        >
          {column.sortable &&
            <div
              onClick={() => this.handleSortWrapper(column.sortKey, true)}
              onKeyPress={this.handleKeyPress}
              role='link'
              tabIndex={index}
            >
              { column.name }
              { column.sortKey === sortKey &&
                column.sortable &&
                <SVGInline svg={transactionArrow} className={classNames({ [styles.ascIcon]: sortOrder === 'asc' })} />
              }
            </div>
          }
          { !column.sortable && column.name }
        </Col>
      )
    })
  }

  render() {
    return (
      <div className={styles.InfoRowHeader}>
        <Row>{ this.renderColumns() }</Row>
      </div>
    )
  }
}

InfoRowHeader.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
  })).isRequired,
}

export default withResponsiveComponent(InfoRowHeader)
