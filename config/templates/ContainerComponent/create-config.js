const path = require('path')

module.exports = {
  id: 'container-component',
  description: `
    Creates a container component per our scaffolding conventions
    (Builds: Component.component.jsx, Component.container.js, component.queries.js,
    Component.less, test/Component.test.js)

    Options:
    --name  Example: Inputting 'FooBar' will output 'FooBar/FooBar.component.jsx'
    --path  (Optional) Example: Inputting 'AssortmentList' will cause files to be outputted at 'src/containers/AssortmentList/**/*'
  `,
  resolveQuestions: async (flags) => [{
    type: 'input',
    name: 'name',
    message: 'What is the name for the React Component?',
    validate: Boolean
  },
  {
    type: 'input',
    name: 'path',
    message: 'What is target directory for the component relative to src/containers directory? (Optional - hit enter to skip)',
    filter: str => str || flags.path || ''
  }],
  resolveFiles: async (answers,flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => path.join(process.cwd(), `src/containers/${answers.path}`)
}
