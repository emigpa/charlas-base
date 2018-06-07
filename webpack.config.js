const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV)
  console.log('PRODUCTION: ', env.production)
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'docs')
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin(
        {
          hash: false,
          template: './src/main.html',
          filename: 'index.html',
          output: path.resolve(__dirname, 'docs')
        }
      ),
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          },
          compress: true
        }
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'docs'),
      compress: true,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'

          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.(html|md)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
      ]
    }
  }
}
