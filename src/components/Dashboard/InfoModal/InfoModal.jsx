import React from 'react'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'

import Modal from 'components/Core/Modal/Modal'

import successIcon from 'assets/images/dashboard/successCheckIcon.svg'
import errorIcon from 'assets/images/dashboard/errorIcon.svg'

import styles from './InfoModal.scss'

const InfoModal = ({ onClose, error, message }) => (
  <Modal className={styles.InfoModal} onClose={onClose} show>
    <div className={styles.content}>
      <SvgInline svg={error ? errorIcon : successIcon} />
      <p className={styles.text}>{ message }</p>
    </div>
  </Modal>
)

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  error: PropTypes.bool,
  message: PropTypes.string,
}

InfoModal.defaultProps = {
  message: '',
  error: false,
}

export default InfoModal
