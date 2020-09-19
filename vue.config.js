const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
        .tap(options => {
          options.rules = {
            'no-console': isProd ? 'error' : 'off'
          }
          return options
        })
  }
}