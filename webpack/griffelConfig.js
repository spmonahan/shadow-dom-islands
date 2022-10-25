const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const griffelWebpackLoader = {
  test: /\.(ts|tsx)$/,
  exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
  use: {
    loader: '@griffel/webpack-loader',
    options: {
      babelOptions: {
        presets: ['@babel/preset-typescript'],
      },
    },
  },
};

const griffelExtractionLoader = {
  test: /\.(js|ts|tsx)$/,
  // Apply "exclude" only if your dependencies **do not use** Griffel
  // exclude: /node_modules/,
  exclude: [/\.wc\.(ts|tsx)?$/, /v9\/simple\-stress/],
  use: {
    loader: GriffelCSSExtractionPlugin.loader,
  },
};
const cssLoader = {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

/**
 * Take the Webpack config object and set properties to
 * configure Griffel.
 *
 * NOTE: this function mutates the `config` object passed in to it.
 */
const configureGriffel = (
  config,
  griffelMode,
) => {
  console.log(`Griffel running in ${griffelMode} mode.`);

  config.module = config.module || {};

  let rules = config.module.rules || [];
  let plugins = config.plugins || [];

  if (griffelMode === 'extraction') {
    rules = [griffelExtractionLoader, griffelWebpackLoader, cssLoader, ...rules];
    plugins = [...plugins, new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
  } else if (griffelMode === 'buildtime') {
    rules = [griffelWebpackLoader, ...rules];
  }

  config.module.rules = rules;
  config.plugins = plugins;

  return config;
};

module.exports = { configureGriffel };
