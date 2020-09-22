module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
      "no-shadow": "off",
      "no-param-reassign": "off",
      "eol-last": "off",
      "arrow-parens": "off",
      "linebreak-style": "off",
      "import/prefer-default-export": "off",
      "import/no-cycle": "off",
      "no-undef": "off",
      "max-len": "off",
      "guard-for-in": "off",
      "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
      "no-restricted-syntax": "off"
    }
};
