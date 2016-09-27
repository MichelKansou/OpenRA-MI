'use strict';

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./webpack.config.base');


const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = [
                'webpack/hot/only-dev-server',
                './app/js/components/app.jsx'
               ];

config.output.publicPath = './dist/';

config.module.loaders.push({
  test: /\.global\.css$/,
  loaders: [
    'style-loader',
    'css-loader?sourceMap'
  ]
}, {
  test: /^((?!\.global).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  ]
});


config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
