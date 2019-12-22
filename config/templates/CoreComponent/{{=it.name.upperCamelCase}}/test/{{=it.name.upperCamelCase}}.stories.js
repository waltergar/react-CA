import React from 'react'

import { storiesOf } from 'facade'
import {{=it.name.upperCamelCase}} from '../{{=it.name.upperCamelCase}}'


const stories = storiesOf('{{=it.name.upperCamelCase}}', module)
stories
  .add('default', () => (<{{=it.name.upperCamelCase}} />))
