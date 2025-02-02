// .eslintrc.js
module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module", 
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    overrides: [
        {
          files: ["*.ts", "*.tsx"],
          parser: "@typescript-eslint/parser",
        },
        {
          files: ["*.js"], 
          parser: "espree",
        },
      ],
    rules: {
      "constructor-super": "error", 
      "no-this-before-super": "error",
      "no-use-before-define": "error", 
      "getter-return": "error",
      "no-unreachable-loop": "error",
      "no-async-promise-executor": "error",
      "no-promise-executor-return": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-dupe-class-members": "error",
      "no-import-assign": "error",
      "no-duplicate-imports": "error",
      "no-unmodified-loop-condition": "error",
      "no-invalid-this": "error",
      "no-else-return": ["warn", { "allowElseIf": false }],
      "no-unneeded-ternary": "error",
      "no-unexpected-multiline": "error",
      "no-console": "off",
    },
  };
  