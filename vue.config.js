const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    https: true, // enable HTTPS
    host: 'localhost',
    port: 8080
  }
})
