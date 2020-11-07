const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    env: {
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
    ],
    rules: {
        "no-console": isProd ? "error" : "off"
    },
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: [
        "vue",
    ]
};