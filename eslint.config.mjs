import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      "**/dist/**",
      "**/node_modules/**", 
      "**/coverage/**",
      "**/*.config.js",
      "**/*.config.cjs",
      "**/*.config.mjs",
      "**/build/**",
      "**/.next/**",
      "**/out/**",
      "apps/web/dist/**",
      "dist/**",
      "scripts/**"
    ]
  },
  {
    languageOptions: { 
      globals: {...globals.browser, ...globals.node} 
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // TypeScript handles prop validation
      "react/display-name": "off",
      "react/no-unescaped-entities": "warn",
      "no-unused-vars": "off", // Use TypeScript version instead
      "no-undef": "off" // TypeScript handles this
    }
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/test-utils/**/*", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];