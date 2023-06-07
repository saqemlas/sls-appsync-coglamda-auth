module.exports = {
  plugins: [
    '@typescript-eslint', 
    'jest', 
    'json-format'
  ],
  overrides: [
    {
      files: '*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      rules: {
        quotes: [ 'warn', 'single' ],
        indent: [ 'warn', 4, { FunctionExpression: { parameters: 'first' }, SwitchCase: 1 } ],
        '@typescript-eslint/ban-ts-comment': 'off',
        "@typescript-eslint/no-unsafe-call": "off",
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        "@typescript-eslint/no-unsafe-member-access": "off",
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-types': 'off',
        'eol-last': 'warn',
        'no-console': 'warn',
        'no-undef': 'off',
        "no-await-in-loop": "off",
        "import/prefer-default-export": "off",
        "prefer-promise-reject-errors": "off",
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.json']
          }
        },
      },
    },
    {
      files: '*.json',
      settings: {
        "json/json-with-comments-files": [".vscode/**"],
      },
    },
  ],
  env: {
    es6: true,
    jest: true,
    node: true
  },
  root: true,
}
