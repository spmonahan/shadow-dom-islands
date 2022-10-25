// import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
// import webpackConfig from '../webpack/webpack.config.js';

// const shutdownServer = () => {
//   if (server) {
//     server.stop().then(() => {
//       console.log('Webpack dev server shutdown.');
//     });
//   }
// };

// let server: WebpackDevServer;

const argv = process.argv;

console.log('argv', argv);

// const args = {
//   griffelMode: argv['griffelMode'],
//   open: !!argv['open'],
//   mode: argv['mode'] ?? 'production',
// };

// const config = webpackConfig(undefined, args);
// const compiler = webpack(config);

// const serverOptions = { ...config.devServer, open: true };
// server = new WebpackDevServer(serverOptions, compiler);

// process.on('uncaughtException', shutdownServer);
// console.log('Starting Webpack dev server...');
// server.start().then(() => {
//   console.log('Webpack dev server started.');
// });
