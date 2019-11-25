module.exports = {
  "parser": "babel-eslint",
  "extends": ["react-app", "plugin:prettier/recommended"],
  "plugins":  ["prettier"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "ecmaVersion": 2018,
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
    "react": {
      "version": "16.12.0",
    },
  },
  "env": {
    "browser": true,
    "amd": true,
    "node": true
  },
};
