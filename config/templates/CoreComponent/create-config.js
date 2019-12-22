// create-config.js
const path = require('path')

module.exports = {
  id: 'core-component',
  description: `
    Creates a core component per our scaffolding conventions, within 'src/Core/'.
    (Builds: Component.jsx, ./Component.less, ./test/Component.stories.js)

    Options:
    --name  Example: Inputting 'FooBar' will output 'src/components/Core/FooBar/FooBar.jsx'
  `,
  resolveQuestions: async (flags) => [{
    type: 'input',
    name: 'name',
    message: 'What is the name for the React Component?',
    validate: Boolean
  }],
  resolveFiles: async (answers,flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => path.join(process.cwd(), 'src/components/Core/')
}
