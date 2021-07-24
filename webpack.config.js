const { ProvidePlugin } = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

  node: {
    global: true
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: 8080,
  },

  mode: "development",

  entry: [
    path.resolve(__dirname, 'src/'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/bundle.[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: {
      'util': require.resolve('util/')
    }
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),

    new ProvidePlugin({ process: 'process/browser' }),

    new NodePolyfillPlugin(),

    new CleanWebpackPlugin()

  ]

}
