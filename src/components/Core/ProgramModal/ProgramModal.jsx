import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Core/Button/Button'
import Modal from 'components/Core/Modal/Modal'

import closeIcon from 'assets/images/global/closeIcon.svg'

import styles from './ProgramModal.scss'

const ProgramModal = ({ handleToggleModal }) => (
  <Modal className={styles.ProgramModal} large>
    <div className={styles.content}>
      <p>Credit Academy Prepaid Mastercard® Program</p>
      <br />
      <p>
        Credit Academy Mastercard is the tool we use to teach teens financial literacy.
      </p>
      <br />
      <p>
        The Credit Academy Mastercard is not a credit card nor a physical prepaid card.
        It is a virtual card account parents authorize their teens to use in the U.S. and
        District of Columbia everywhere a Debit Mastercard is accepted.
        The account is funded from a linked bank account and, it continues to be loaded every
        time a chore(s) is completed by a teen and approved by the parent.
      </p>
      <p>
        We’ve designed Credit Academy with teens in mind to teach financial literacy and
        the responsibility to work hard to pay parents back with chores, for purchases
        made online using their Credit Academy Mastercard.
      </p>
      <p>
        A Credit Academy Mastercard gives parents complete control of their teen’s spending,
        while teens receive a real first-hand experience on how to be financially responsible.
        Our goal is to ease teens into financial habits from the get-go, to prevent mistakes
        down the road.
      </p>
    </div>
    <Button iconOnly icon={closeIcon} onClick={handleToggleModal} />
  </Modal>
)

ProgramModal.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
}

export default ProgramModal
