import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, pluginReact },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["js/recommended"],
  },
  
  tseslint.configs.recommended,
  ...pluginReact.configs.flat.recommended,
]);
