import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from 'components/Core/Button/Button'
import styles from './Card.scss'


const Card = ({ buttonText, buttonIcon, buttonAction, fluid, flex, className, children }) => (
  <div className={classNames(
      styles.Card,
      { [styles.fluid]: fluid },
      className,
    )}
  >
    <div className={classNames({ [styles.flex]: flex })}>{ children }</div>
    {
      buttonText && buttonAction
      && <Button primary onClick={buttonAction} icon={buttonIcon} text={buttonText} />
    }
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  buttonIcon: PropTypes.node,
  fluid: PropTypes.bool,
  flex: PropTypes.bool,
}

Card.defaultProps = {
  className: '',
  buttonText: '',
  buttonAction: null,
  buttonIcon: null,
  fluid: false,
  flex: false,
}


export default Card
