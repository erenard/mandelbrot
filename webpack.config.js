const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const outputDirectory = 'dist'
const config = {
  entry: { main: './src/main' },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, outputDirectory)
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputDirectory),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader'
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },
      { test: /\.ttf$/, use: 'file-loader' }
    ]
  },
  devtool: 'source-map',
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
