module.exports = {
    "extends": "airbnb",
    "rules": {
      "arrow-parens": 0,
      "react/prop-types": 0,
      "global-require": 0,
      "react/jsx-filename-extension": [1, {
        "extensions": [".js", ".jsx"]
      }],
      "class-methods-use-this": 0,
      "react/jsx-props-no-spreading": 0
    },
    globals: {
      use: true
    },
    "settings": {
      "import/resolver": {
        "node": {
          "paths": ["next"],
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      },
    },
};
