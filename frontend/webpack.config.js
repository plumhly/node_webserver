const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let config = {
  mode: 'development',
  entry: {
    app: './src/app.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './dist/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/favicon.ico',
          to: '../dist',
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },

    compress: true,
    port: 8080,
  },

  devtool: 'source-map',
};

module.exports = config;
