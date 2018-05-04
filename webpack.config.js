const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: { main: './src' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    alias: { vue: 'vue/dist/vue.js' }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.png$/, use: 'url-loader?limit=100000' },
      // { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.ttf$/, use: 'file-loader' }
    ]
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: false,
    port: 9000
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  }
}

module.exports = config
