import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import withResponsiveComponent from 'components/Hoc/Responsive/Responsive'
import { Col } from 'components/Core/Section/Section'
import Aux from 'components/Hoc/Aux/Aux'
import VirtualCard from 'components/Core/VirtualCard/VirtualCard'
import Button from 'components/Core/Button/Button'
import trashIcon from 'assets/images/dashboard/trashIcon.svg'
import styles from '../InfoRow.scss'

class Chore extends Component {
  renderMobileParentChoreActions = (chore, deleteChore) => (
    <div className={styles.mobileChoreActions}>
      <div className={styles.date}>{chore.created}</div>
      <div className={styles.bottom}>
        <div className={styles.amount}>{chore.rate}</div>
        <Button
          className={classNames(styles.button, styles.deleteChoreButton)}
          onClick={() => deleteChore(chore)}
          iconOnly
          icon={trashIcon}
        />
      </div>
    </div>
  )

  renderParentChore = () => {
    const { chore, deleteChore, isMobile } = this.props
    const { card: { card } } = this.props

    return (
      <Aux>
        <Col xs='2' md='1'>
          <VirtualCard
            card={card}
            // image={cardImage.imageUrl}
            // color={cardImage.color}
            mini
          />
        </Col>
        <Col xs='5' md='7'><p className={styles.name}>{chore.name}</p></Col>
        { isMobile && (
          <Col xs='5' md='5'>
            { this.renderMobileParentChoreActions(chore, deleteChore) }
          </Col>
        )}

        { !isMobile && (
          <Aux>
            <Col md='2'><div className={styles.date}>{chore.created}</div></Col>
            <Col md='1'><div className={styles.amount}>{chore.rate}</div></Col>
            <Col md='1'>
              <Button
                className={classNames(styles.button, styles.deleteChoreButton)}
                onClick={() => deleteChore(chore)}
                iconOnly
                icon={trashIcon}
              />
            </Col>
          </Aux>
        )}
      </Aux>
    )
  }

  renderChildChore = () => {
    const { chore, submitPayment, loading } = this.props
    return (
      <Aux>
        <Col md='9' xs='9'><p className={styles.name}>{`${chore.name} for ${chore.rate}`}</p></Col>
        <Col md='3' xs='3'>
          <Button
            className={styles.payButton}
            onClick={() => submitPayment(chore)}
            text='Done'
            textOnly
            disabled={loading}
          />
        </Col>
      </Aux>
    )
  }

  render() {
    const { isChild } = this.props
    return (
      <div className={classNames(styles.InfoRowItem, styles.Chore)}>
        { isChild ? this.renderChildChore() : this.renderParentChore() }
      </div>
    )
  }
}

Chore.propTypes = {
  chore: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  deleteChore: PropTypes.func,
  submitPayment: PropTypes.func,
  isChild: PropTypes.bool,
  loading: PropTypes.bool,
  card: PropTypes.object,
}

Chore.defaultProps = {
  deleteChore: null,
  submitPayment: null,
  isChild: false,
  card: {},
  loading: false,
}

export default withResponsiveComponent(Chore)
