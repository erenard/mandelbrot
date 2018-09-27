const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env, argv) {
  return {
    entry: { application: './src/application' },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin('dist', { exclude: ['.git', '.circleci', '.gitignore'] })
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
        { test: /\.ttf$/, use: 'file-loader' },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
    },
    devtool: 'source-map',
    devServer: {
      compress: false,
      port: 9000
    },
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [new UglifyJsPlugin({
        parallel: true
      })]
    }
  }
}
