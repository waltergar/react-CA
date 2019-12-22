import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgInline from 'react-svg-inline'

import styles from './Button.scss'


const Button = ({
  primary,
  secondary,
  onClick,
  className,
  children,
  icon,
  iconOnly,
  small,
  middle,
  tiny,
  disabled,
  text,
  textOnly,
  nocaps,
  outline,
}) => {
  const buttonClass = classNames(
    styles.Button,
    { [styles.primary]: primary },
    { [styles.secondary]: secondary },
    { [styles.outline]: outline },
    { [styles.small]: small },
    { [styles.middle]: middle },
    { [styles.tiny]: tiny },
    className,
    { [styles.iconOnly]: iconOnly },
    { [styles.disabled]: disabled },
    { [styles.textOnly]: textOnly },
    { [styles.nocaps]: nocaps },
  )

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      { !iconOnly && text }
      { children }
      { iconOnly && icon && <SvgInline svg={icon} className={styles.icon} /> }
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  middle: PropTypes.bool,
  tiny: PropTypes.bool,
  iconOnly: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  textOnly: PropTypes.bool,
  nocaps: PropTypes.bool,
  text: PropTypes.string,
}

Button.defaultProps = {
  children: null,
  primary: false,
  secondary: false,
  className: '',
  icon: null,
  small: false,
  outline: false,
  middle: true,
  tiny: false,
  iconOnly: false,
  disabled: false,
  onClick: null,
  textOnly: false,
  nocaps: false,
  text: '',
}

export default Button
