import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';



/** @type {import('eslint').Linter.Config[]} */
export default [
 
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
 
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          "allowShortCircuit": true
        }
      ],
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-undef": "error"
    }

  }
];