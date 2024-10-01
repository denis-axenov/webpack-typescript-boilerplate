const eslint = require("@eslint/js");
const tsEslint = require('typescript-eslint');
const globals = require("globals");


module.exports = [
    eslint.configs.recommended,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
    {
        files: [
            "src/scripts/**/*.ts"
        ],
        ignores: [
            '**/*.config.js'
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser
            }
        },
        rules: {
            "semi": "error",
            "no-undef": "warn"
        }
    }
];