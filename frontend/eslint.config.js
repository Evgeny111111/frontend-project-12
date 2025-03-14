import eslint from 'eslint';
import babelParser from '@babel/eslint-parser';

const { FlatConfig } = eslint;

export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        localStorage: "readonly", // Добавляем localStorage как доступную переменную
        console: "readonly",       // Добавляем console как доступную переменную
        document: "readonly",      // Добавляем document как доступную переменную
      },
    },
    ignores: ["node_modules/", "dist/"],
    rules: {
      "no-console": "off",  // Отключаем правило для console
      "no-undef": "error",  // Ошибка для неопределённых переменных
    },
  },
];
