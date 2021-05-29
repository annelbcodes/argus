const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        'no-console': isProd ? 'error' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: '2019',
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
}
