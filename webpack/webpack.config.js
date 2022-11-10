const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { configurePages } = require('./pageConfig.js');
const { configureGriffel } = require('./griffelConfig.js');

const enabledReactProfiling = true;

const createConfig = (env, argv) => {

  const isProd = !argv || argv.mode === 'production';

  let config = {
    mode: argv.mode,
    output: {
      filename: '[name].[contenthash].bundle.js',
      sourceMapFilename: '[name].[contenthash].map',
      path: path.resolve(path.dirname(__dirname), !isProd ? 'dev-build' : 'dist'),
    },
    devtool: 'source-map',
    resolve: {
      alias: {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                target: 'es2019',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  decoratorMetadata: true,
                  legacyDecorator: true,
                },
                keepClassNames: true,
                externalHelpers: true,
                loose: true,
              },
            },
          },
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],

    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  if (enabledReactProfiling) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    };
  }

  if (!isProd) {
    config.devServer = {
      port: argv.port ? Number(argv.port) : 9000,
      open: false,
      hot: true,
      compress: true,
    };
  }

  config = configureGriffel(config, 'buildtime');
  config = configurePages(config);

  return config;
};

module.exports = createConfig;
