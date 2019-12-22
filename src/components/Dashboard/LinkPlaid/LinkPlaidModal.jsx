import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlaid, { AUTH_PRODUCT } from 'react-plaid'

import { log } from 'utils/log'
import { bankAccountService } from 'utils/api/parent'

import globalsConnector from 'store/globals/connector'
import userConnector from 'store/currentUser/connector'
import createCardConnector from 'store/createCard/connector'

class LinkPlaidModal extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.props.togglePlaidVisibility(false)
  }

  handlePlaidOnSuccess = (token, metaData) => {
    log.debug({ fn: 'LinkPlaid.handleStorePlaidResponse', token, metaData })
    this.setState(prevState => ({ ...prevState, selectedAccount: metaData.account }))
    this.props.storePlaidToken(token)
    this.props.storePlaidMeta(metaData)
    this.props.togglePlaidVisibility(false)
    this.handleLinkPlaidAccount()
  }

  handlePlaidOnExit = () => {
    log.debug({ fn: 'handlePlaidOnExit' })
    this.setState(prevState => ({ ...prevState, prematureExit: true }))
    this.props.togglePlaidVisibility(false)
  }

  handleReopenPlaid = () => {
    log.debug({ fn: 'handleReopenPlaid' })
    this.setState(prevState => ({ ...prevState, prematureExit: false }))
    this.props.togglePlaidVisibility(true)
  }

  handleLinkPlaidAccount = () => (
    bankAccountService
      .linkAccount(this.props.getLinkPlaidForm())
      // .linkAccount({
      //   public_token: 'plaid-public-token',
      //   account_type: 'checking',
      //   selected_account: '1234',
      //   institution_name: 'Chase',
      //   institution_id: 'ins_3',
      // })
      .then(this.handleLinkPlaidResponse)
      .catch(this.handlePlaidServerError)
  )

  handleAdditionalBankVerification = () => {
    bankAccountService.verifyLinkedAccount({
      routing: 'string',
      account: '1234',
      name: 'account_name',
      last_four: '1234',
    }).then((res) => {
      log.debug({ fn: 'handleAdditionalBankVerification', res })
      this.props.onReload(res.data)
    })
      .catch(this.handlePlaidServerError)
  }

  handleLinkPlaidResponse = (res) => {
    log.debug({ fn: 'handleLinkPlaidResponse', res })
    if (res.status === 200 || res.status === 201) this.props.onReload(res.data)
    if (res.status === 285) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        requiresBankVerification: true,
      }))
      this.handleAdditionalBankVerification()
    }
    if (res.status === 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'Hmm, the bank you tried to link is already linked, if you believe this is a mistake, please contact support.',
      }))
    }
    if (res.status !== 200 && res.status !== 201 && res.status !== 285 && res.status !== 409) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: 'There seems to have been an issue, please try again later.',
      }))
    }
  }

  render() {
    const {
      isPlaidVisible,
    } = this.props
    const {
      loading,
    } = this.state

    const plaidConfig = {
      clientName: 'Credit Academy',
      product: [AUTH_PRODUCT],
      apiKey: process.env.REACT_APP_PLAID_PUBLIC_KEY,
      env: process.env.REACT_APP_PLAID_ENV,
      open: isPlaidVisible,
      selectAccount: true,
      onSuccess: this.handlePlaidOnSuccess,
      onExit: this.handlePlaidOnExit,
    }

    log.debug({ fn: 'LinkPlaid.render', plaidConfig })

    if (loading) return <p>Loading ...</p>

    return (
      <ReactPlaid {...plaidConfig} />
    )
  }
}

LinkPlaidModal.propTypes = {
  isPlaidVisible: PropTypes.bool.isRequired,
  getLinkPlaidForm: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  togglePlaidVisibility: PropTypes.func.isRequired,
  storePlaidToken: PropTypes.func.isRequired,
  storePlaidMeta: PropTypes.func.isRequired,
}

export default globalsConnector(userConnector(createCardConnector(LinkPlaidModal)))
