const path = require('path');

module.exports = {
  "globals": {
    "context": false
  },
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
  },
  "extends": ["airbnb"],
  "rules": {
    "semi": ["error", "never"],
    "jsx-quotes": "off",
    "object-curly-newline": "off",
    "camelcase": "off",
    "max-len": "warn",
    "react/forbid-prop-types": "off"
  },
  "overrides": [
    {
      "files": [ "**/test/**/*.test.js", "**/test/**/*.mock.js" ],
      "rules": {
        "react/jsx-filename-extension": "off",
        "import/no-extraneous-dependencies": "off",
        "react/prop-types": "off",
      }
    },
    {
      "files": [ "src/**/*.js", ".storybook/**/*.js" ],
      "rules": {
        "import/prefer-default-export": "off"
      }
    }
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "test"),
        ],
      },
    },
  },
}
