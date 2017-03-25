var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'dev';

let path = __dirname;
let publicPath = '/';
let indexFile = 'index.html';
let plugins = [];

if (!isDev) {
  path = __dirname + '/build/dist';
  publicPath = './dist';
  indexFile = '../index.html';
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

plugins.unshift(
  new HtmlWebpackPlugin({
    title: '登陆测试',
    template: './src/template/index.html',
    filename: indexFile,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
    }
  })
);

module.exports = {
  entry: [
    './src/App.jsx'
  ],
  output: {
    // path: __dirname + '/dist',
    path: path,
    publicPath: publicPath,
    filename: '[name].[hash:6].js',
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /^node_modules$/,
      loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
    }],
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};