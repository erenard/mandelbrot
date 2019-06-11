const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const developmentPort = 9000

module.exports = function (env, argv) {
  const config = {
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
      new VueLoaderPlugin()
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
      port: developmentPort
    },
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [new UglifyJsPlugin({
        parallel: true
      })]
    }
  }
  if (argv['bundle-analyzer']) {
    config.plugins.push(new BundleAnalyzer({
      analyzerPort: developmentPort
    }))
  }
  return config
}
