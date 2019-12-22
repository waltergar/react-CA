import React, { Component } from 'react'

import styles from './{{=it.name.upperCamelCase}}.less'


class {{=it.name.upperCamelCase}} extends Component {
  state = {}

  render() {
    return (
      <div className={styles.{{=it.name.upperCamelCase}}}>
        Container Component: {{=it.name.upperCamelCase}}
      </div>
    )
  }
}

{{=it.name.upperCamelCase}}.propTypes = {}
{{=it.name.upperCamelCase}}.defaultProps = {}

export default {{=it.name.upperCamelCase}}
