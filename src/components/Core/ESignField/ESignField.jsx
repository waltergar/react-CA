import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgInline from 'react-svg-inline'
import SignatureCanvas from 'react-signature-canvas'

import trashIcon from 'assets/images/dashboard/trashIcon.svg'
import styles from './ESignField.scss'

class ESignField extends Component {
  constructor(props, context) {
    super(props, context)
    this.sigCanvas = React.createRef()
    this.onEnd = this.onEnd.bind(this)
  }

  onEnd() {
    const { name, onChange } = this.props
    const data = this.sigCanvas.toData()
    onChange(JSON.stringify(data), name)
  }

  onClear = () => {
    const { name, onChange } = this.props
    onChange('', name)
    this.sigCanvas.clear()
  }

  render() {
    return (
      <div id={this.fieldId} className={styles.signContainer}>
        <SignatureCanvas
          penColor='black'
          backgroundColor='white'
          canvasProps={{ width: 300, height: 150 }}
          onEnd={this.onEnd}
          ref={(ref) => { this.sigCanvas = ref }}
        />
        <SvgInline
          svg={trashIcon}
          className={styles.inputIcon}
          onClick={this.onClear}
        />
      </div>
    )
  }
}

ESignField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ESignField
