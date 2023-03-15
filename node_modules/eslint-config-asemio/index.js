module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "brace-style": [
            "error",
            "stroustrup",
            { "allowSingleLine": true }
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-infix-ops": ["error"],
        "no-multi-spaces": ["error"],
        "func-call-spacing": ["error", "never" ],
        "no-trailing-spaces": ["error"]
    }
};
