import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import SvgInline from 'react-svg-inline'
import get from 'lodash/get'

import Aux from 'components/Hoc/Aux/Aux'
import { formatDate } from 'utils/formatters/dates'
import { formatAccountNumber } from 'utils/formatters/cards'

// import mastercard from 'assets/images/mastercard.svg'
// import logo from 'assets/images/logo/logo_full_white.svg'
import cardImage from 'assets/images/cc.png'
import styles from './VirtualCard.scss'


const VirtualCard = ({
  className,
  nameOnly,
  detailed,
  sample,
  color,
  onClick,
  accountNumber,
  expirationDate,
  cvv,
  name,
  logoText,
  image,
  naked,
  mid,
  mini,
  card,
}) => {
  const renderCardDetails = () => {
    if (mini) {
      return (
        <div className={styles.background} style={{ backgroundColor: color }}>
          <div className={styles.content}>{ get(card, 'cardHolder.firstName', 'James').slice(0)[0] }</div>
        </div>
      )
    }

    if (sample) {
      return (
        <Aux>
          <div className={styles.background} style={{ backgroundColor: color }}>
            <div className={styles.logoText}>
              <p>{ logoText }</p>
            </div>
            <div className={classNames(styles.top, { [styles.sample]: sample })}>
              <p className={styles.account}>{ accountNumber }</p>
            </div>
            <div className={styles.bottom}>
              <p className={styles.expiration}>{ name }</p>
              {/* <SvgInline svg={mastercard} /> */}
            </div>
          </div>
        </Aux>
      )
    }

    if (detailed) {
      return (
        <Aux>
          <div className={styles.background} style={{ backgroundColor: color }}>
            <div className={styles.top}>
              <p className={styles.account}>{ formatAccountNumber(detailed, accountNumber) }</p>
            </div>
            <div className={styles.bottom}>
              <p className={styles.expiration}>{ formatDate(expirationDate, 'MM/YY') }</p>
              <p className={styles.cvv}>{cvv}</p>
              <p className={styles.cvv} />
              {/* <SvgInline svg={mastercard} /> */}
            </div>
          </div>
        </Aux>
      )
    }

    if (nameOnly) {
      return (
        <Aux>
          <div className={styles.gradientBackground}>
            <div className={styles.bottom}>
              <p className={classNames(styles.name, styles.nameOnly)}>{name}</p>
            </div>
          </div>
        </Aux>
      )
    }

    return (
      <Aux>
        <div className={styles.top}>
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.account}>{ formatAccountNumber(detailed, accountNumber) }</p>
          {/* <SvgInline svg={mastercard} /> */}
        </div>
      </Aux>
    )
  }

  return (
    // eslint-disable-next-line
    <div
      className={classNames(
        { [styles.card]: !nameOnly || !detailed },
        { [styles.newCard]: nameOnly || detailed },
        { [styles.nameOnly]: nameOnly || naked },
        { [styles.image]: image },
        { [styles.mid]: mid },
        { [styles.mini]: mini },
        className,
      )}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      {/* { !naked && !mini && <SvgInline className={styles.logo} svg={logo} /> } */}
      { !naked && renderCardDetails() }
    </div>
  )
}

VirtualCard.propTypes = {
  className: PropTypes.string,
  detailed: PropTypes.bool,
  nameOnly: PropTypes.bool,
  sample: PropTypes.bool,
  color: PropTypes.string,
  accountNumber: PropTypes.string,
  expirationDate: PropTypes.string,
  cvv: PropTypes.string,
  name: PropTypes.string,
  logoText: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string,
  naked: PropTypes.bool,
  mid: PropTypes.bool,
  mini: PropTypes.bool,
  card: PropTypes.object,
}

VirtualCard.defaultProps = {
  className: '',
  detailed: false,
  nameOnly: false,
  sample: false,
  color: null,
  accountNumber: '',
  expirationDate: '',
  cvv: '',
  name: 'Timmy Turner',
  logoText: '',
  onClick: null,
  image: cardImage,
  naked: false,
  mid: false,
  mini: false,
  card: {},
}

export default VirtualCard
