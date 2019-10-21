'use strict'
const path = require('path')
const name = 'ATA' // page title

function resolve(dir) {
      return path.join(__dirname, dir)
    }


module.exports = {
      publicPath :'/',
      outputDir: 'dist',
      assetsDir: 'static',
      productionSourceMap: false,
      devServer:{
        overlay:{
          warning:false,
          errors:true,
        }
      },

      configureWebpack: {
            // provide the app's title in webpack's name field, so that
            // it can be accessed in index.html to inject the correct title.
            name: name,
            resolve: {
              alias: {
                '@': resolve('src')
              }
            }
          },

          chainWebpack(config) {
            // config.plugins.delete('preload') // TODO: need test
            // config.plugins.delete('prefetch') // TODO: need test
            config.module.rules.delete("svg"); 
            // set svg-sprite-loader
            config.module
              .rule('svg')
              .exclude.add(resolve('src/icons'))
              .end()
            config.module
              .rule('icons')
              .test(/\.svg$/)
              .include.add(resolve('src/icons'))
              .end()
              .use('svg-sprite-loader')
              .loader('svg-sprite-loader')
              .options({
                symbolId: 'icon-[name]'
              })
              .end()
            }
}