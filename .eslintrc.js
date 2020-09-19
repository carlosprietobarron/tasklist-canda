module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-shadow": "off",
    "no-param-reassign": "off",
    "eol-last": "off",
    "arrow-parens": "off",
    "linebreak-style": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off"
  },
};
