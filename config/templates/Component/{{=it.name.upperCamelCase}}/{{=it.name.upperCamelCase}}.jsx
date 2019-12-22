import React from 'react'

import styles from './{{=it.name.upperCamelCase}}.less'


const {{=it.name.upperCamelCase}} = () => (
  <div className={styles.{{=it.name.upperCamelCase}}}>
    Pure Component: {{=it.name.upperCamelCase}}
  </div>
)

{{=it.name.upperCamelCase}}.propTypes = {}
{{=it.name.upperCamelCase}}.defaultProps = {}

export default {{=it.name.upperCamelCase}}
