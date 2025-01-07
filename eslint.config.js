import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import parser from "@typescript-eslint/parser";

export default [
    ...tsEslint.configs.recommended,
    {
        ...eslint.configs.recommended,
        files: [
            "src/scripts/**/*.ts"
        ],
        ignores: [
            '**/*.config.js'
        ],
        languageOptions: {
            parser: parser,
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