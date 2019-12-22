// create-config.js
const path = require('path')

module.exports = {
  id: 'redux-store',
  description: `
    Creates a redux store, within 'src/store/'.
    (Builds: actions.js, reducers.js, selectors.js, connector.js, ./test/**.test.js)

    Options:
    --name  Example: Inputting 'FooBar' will output 'src/store/FooBar/actions.js'
  `,
  resolveQuestions: async (flags) => [{
    type: 'input',
    name: 'name',
    message: 'What is the name for the Redux Store?',
    validate: Boolean
  }],
  resolveFiles: async (answers,flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => path.join(process.cwd(), 'src/store/')
}
