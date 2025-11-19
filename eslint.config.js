import nextPlugin from '@next/eslint-plugin-next';
import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  nextPlugin.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: true,
        console: true,
        document: true,
        clearTimeout: true,
        setTimeout: true,
        localStorage: true,
        URL: true,
      },
    },
  },
];