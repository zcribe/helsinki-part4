import globals from "globals";
import js from "@eslint/js";
import pluginJs from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
