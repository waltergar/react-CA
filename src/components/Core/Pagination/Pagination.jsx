import React, { Component } from 'react'
import classNames from 'classnames'

import { Row, Col } from 'components/Core/Section/Section'
import { log } from 'utils/log'
import styles from './Pagination.scss'

/*
  eslint-disable
  react/prop-types,
  no-plusplus,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions
*/
class Pagination extends Component {
  state = {
    items: [],
    currentPage: 1,
    itemsPerPage: 3,
  }

  componentDidMount() {
    this.handleInitialLoad()
    log.debug('Rendering', this.props.items)
  }

  handleInitialLoad = () => (
    this.setState(
      prevState => ({ ...prevState, items: this.props.items }),
      () => this.handlePaginateWrapper(),
    )
  )

  handlePaginateWrapper = () => {
    const { handlePaginate } = this.props
    const { items, currentPage, itemsPerPage } = this.state

    if (items) {
      handlePaginate(currentPage, itemsPerPage)
    }
  }

  handleClick = id => (
    this.setState(
      prevState => ({ ...prevState, currentPage: Number(id) }),
      () => this.handlePaginateWrapper(),
    )
  )

  handleItemsPerPageChange = ({ target: { value: itemsPerPage } }) => {
    this.setState(
      prevState => ({ ...prevState, currentPage: 1, itemsPerPage }),
      () => this.handlePaginateWrapper(),
    )
  }

  renderPageNumbers = () => {
    const { items, itemsPerPage, currentPage } = this.state
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) pageNumbers.push(i)

    if (pageNumbers.length > 5) {
      const currentPageIndex = pageNumbers.indexOf(this.state.currentPage)
      const start = this.state.currentPage > 3 ? currentPageIndex - 2 : 0
      const end = this.state.currentPage > 3 ? currentPageIndex + 3 : 5
      const pageNumbersFiltered = pageNumbers.slice(start, end)
      return (
        pageNumbersFiltered.map(number => (
          <li
            className={classNames({ [styles.active]: number === currentPage })}
            key={number}
            onClick={() => this.handleClick(number)}
          >{number}
          </li>
        ))
      )
    }

    return (pageNumbers.map(number => (
      <li
        className={classNames({ [styles.active]: number === currentPage })}
        key={number}
        onClick={() => this.handleClick(number)}
      >{number}
      </li>
    )))
  }

  render() {
    const { items } = this.state
    if (!items) return null

    return (
      <Row className={styles.Pagination}>
        <Col xs='8'>
          <nav className={styles.links}>
            <ul>{ this.renderPageNumbers() }</ul>
          </nav>
        </Col>
        <Col xs='4'>
          <select
            className={styles.selection}
            value={this.state.itemsPerPage}
            onChange={this.handleItemsPerPageChange}
          >
            <option value="3">Show 3 per page</option>
            <option value="8">Show 8 per page</option>
            <option value="15">Show 15 per page</option>
            <option value="32">Show 32 per page</option>
          </select>
        </Col>
      </Row>
    )
  }
}

export default Pagination
