module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["./"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  "env": {
    "browser": true,
    "amd": true,
    "node": true
},
};
