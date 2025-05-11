import { fileURLToPath } from "url";
import { dirname } from "path";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import jsdocPlugin from "eslint-plugin-jsdoc";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      jsdoc: jsdocPlugin,
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      "your-offending-rule-name": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          trailingComma: "all",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "public-instance-field",
              "protected-instance-field",
              "private-instance-field",
              "constructor",
              "public-method",
              "protected-method",
              "private-method",
            ],
            order: "alphabetically",
          },
        },
      ],
      "sort-vars": ["error", { ignoreCase: false }],
      "sort-keys": [
        "error",
        "asc",
        { caseSensitive: false, minKeys: 2, natural: true },
      ],
      "function-call-argument-newline": ["error", "consistent"],
      "function-paren-newline": ["error", "consistent"],
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "import/exports-last": "error",
      "sonarjs/no-duplicate-string": "off",
      "unicorn/no-null": "off",
      "jsdoc/no-undefined-types": "error",
      "jsdoc/require-returns-description": "off",
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "max-params": ["error", 4],
      "no-console": ["error"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "object-shorthand": ["error"],
      "prefer-destructuring": ["error"],
      quotes: ["error", "double"],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    files: [
      "**/*.entity.ts",
      "**/*.dto.ts",
      "**/*.response.ts",
      "**/*.request.ts",
      "**/migrations/*.ts",
    ],
    rules: {
      "@typescript-eslint/member-ordering": "off",
    },
  },
  {
    files: ["**/migrations/*.ts"],
    rules: {
      quotes: "off",
    },
  },
  {
    files: ["**/*.config.ts", "**/*.types.ts", "**/*.type.ts"],
    rules: {
      "sort-keys": "off",
    },
  },
];
