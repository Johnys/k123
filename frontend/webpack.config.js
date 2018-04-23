const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = (function makeWebpackConfig() {
  const config = {};
  config.entry = {
    app: './src/app/app.js',
  };
  config.mode = isProd ? 'production' : 'development';
  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js',
  };
  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }
  config.module = {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      use: 'file-loader',
    }, {
      test: /\.html$/,
      use: 'raw-loader',
    }],
  };
  config.plugins = [];
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css', chunkFilename: '[id].css' }),
  );
  if (isProd) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'src', 'public'),
      }]),
    );
    config.optimization = {
      minimizer: [new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      })],
    };
  }

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
    host: '0.0.0.0',
  };
  return config;
}());
