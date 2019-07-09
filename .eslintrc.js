module.exports = {
  "env": {
    "browser": true,
    "shared-node-browser": true,
    "jquery": true
  },
  "parserOptions": {
    "ecmaVersion": 5,
    "sourceType": "script"
  },
  "rules": {
    "curly": [ 2, "all" ],
    "no-debugger": 2,
    "eqeqeq": 2,
    "no-caller": 2,
    "no-empty": [ 2, { "allowEmptyCatch": true } ],
    "no-plusplus": 0,
    "no-undef": 2,
    "dot-notation": 0,
    "strict": 0,
    "no-eq-null": 2,
    "brace-style": [ 2, "1tbs", { "allowSingleLine": true } ],
    "quote-props": [ 2, "as-needed", { "keywords": true } ],
    "no-spaced-func": 2,
    "comma-dangle": [2, "never"],
    "no-trailing-spaces": 2,
    "yoda": [2, "never"],
    "comma-style": [2, "last"],
    "eol-last": 2,
    "semi": [2, "always"],
    "keyword-spacing": [
      2,
      {
        "overrides": {
          "else": {
            "before": true
          },
          "while": {
            "before": true
          },
          "catch": {
            "before": true
          }
        }
      }
    ],
    "space-before-blocks": [ 2, "always" ],
    "key-spacing": [ 2, { "afterColon": true } ],
    "indent": [ 2, 2, { "SwitchCase": 1 } ],
    "quotes": [ 2, "single", { "avoidEscape": true } ],
    "one-var": [
      2,
      {
        "uninitialized": "always",
        "initialized": "never"
      }
    ],
    "dot-location": [ 2, "property" ],
    "operator-linebreak": [ 2, "before" ],
    "array-bracket-spacing": [ 2, "always" ]
  }
}