import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import styles from './KeyValuePair.scss'

const LightTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(24),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}))(Tooltip)

const KeyValuePair = ({ title, value, tooltip, avatar, isVertical }) => (
  <div className={isVertical ? styles.vKeyValuePair : styles.KeyValuePair}>
    {tooltip ?
      <LightTooltip title={tooltip} placement='top-start'>
        <div className={isVertical ? styles.vKey : styles.key}>{ title }</div>
      </LightTooltip>
    :
      <div className={isVertical ? styles.vKey : styles.key}>{ title }</div>
    }
    <div className={isVertical ? styles.vValue : styles.value}>
      {avatar &&
        <img className={isVertical ? styles.vAvatar : styles.avatar} src={avatar} alt={title} />
      }
      { value }
    </div>
  </div>
)

KeyValuePair.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  tooltip: PropTypes.string,
  avatar: PropTypes.string,
  isVertical: PropTypes.bool,
}

KeyValuePair.defaultProps = {
  tooltip: null,
  avatar: null,
  isVertical: false,
}

export default KeyValuePair
