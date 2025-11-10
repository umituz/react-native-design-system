const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

module.exports = [
  // ESLint recommended rules
  js.configs.recommended,

  // Global configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // TypeScript and TSX files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // TypeScript rules
      "no-unused-vars": "off", // Disable base rule for TypeScript
      "@typescript-eslint/no-unused-vars": "off", // Allow unused vars in generated code
      "@typescript-eslint/no-explicit-any": "off", // Allow any in utility types
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off", // Allow non-null assertions
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-var-requires": "off",

      // General code quality
      "no-console": "off", // Allow console in development
      "no-debugger": "warn",
      "no-alert": "warn",
      "prefer-const": "off", // Allow let in generated code
      "no-var": "error",
      "no-undef": "off", // TypeScript handles this

      // React rules
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/display-name": "warn",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/no-children-prop": "warn",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-unescaped-entities": "warn",
      "react/no-unknown-property": "error",
      "react/self-closing-comp": "warn",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off", // Allow missing dependencies in generated code
    },
  },

  // JavaScript and JSX files configuration
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "no-unused-vars": "off", // Allow unused vars in generated code
      "no-console": "off", // Allow console in development
      "prefer-const": "off", // Allow let in generated code
      "no-var": "error",

      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off", // Allow missing dependencies in generated code
    },
  },

  // Configuration files
  {
    files: ["*.config.js", "*.config.ts", ".eslintrc.js", "babel.config.js", "metro.config.js"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "**/*.d.ts",
    ],
  },
];

