module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  rules:  {
    'semi': [2, 'always'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};
