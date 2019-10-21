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
}