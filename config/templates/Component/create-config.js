const path = require('path')

/**
 * Template for a react pure component.
 *
 * @param {String} name     The name of the Component to create.
 * @param {String} path     The relative path from src/components, where the template will be moved into.
 *
 * @example create pure-component --name="FooBar" --path="examples/results"
 */

module.exports = {
  id: 'component',
  description: `
    Creates a dumb component per our scaffolding conventions.
    (Builds: Component.jsx, Component.less, test/Component.test.js)

    Options:
    --name  Example: Inputting 'FooBar' will output 'FooBar/FooBar.jsx'
    --path  (Optional) Example: Inputting 'AssortmentList' will cause files to be outputted at 'src/components/AssortmentList/**/*'
  `,
  resolveQuestions: async (flags) => [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the React Component?',
    validate: Boolean
  },
  {
    type: 'input',
    name: 'path',
    message: 'What is target directory for the component relative to src/components directory? (Optional - hit enter to skip)',
    filter: str => str || flags.path || ''
  }],
  resolveFiles: async (answers,flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => path.join(process.cwd(), `src/components/${answers.path}`)
}
