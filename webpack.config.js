const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: { main: './src/main' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
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
            name: '[name].[ext]'
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
