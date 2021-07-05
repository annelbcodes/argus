const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    env: {
        node: true,
        es6: true,
        es2021: true,
    },
    extends: ['prettier', 'eslint:recommended', 'plugin:vue/essential'],
    rules: {
        'no-console': isProd ? 'error' : 'off',
        'prettier/prettier': 'error',
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: '2019',
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
}
