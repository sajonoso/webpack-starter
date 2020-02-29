/*
  Webpack interface script
  This script provides access to features of webpack used by this
  project, without having to install webpack-dev-server and webpack-cli
  Exmaple usage:
  node webpack-int.js build --mode=prod
  node webpack-int.js watch
*/

const path = require('path');
const webpack = require('webpack');
const spawn = require('child_process').spawn;

const webpackConfig = require('./webpack.config.js');


const print = console.log; // use print for output that will never be debug messages

const showStatErrors = (stats) => {
  const info = stats.toJson();

  if (stats.hasErrors()) {
    info.errors.forEach(message => console.log('## 3', message));
    return;
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach(message => {
      //TODO ignore specific warning for expressjs until a solution can be found
      if (! (message.indexOf('Critical dependency: the request of a dependency is an expression') > 0))
        console.log('## 4', message)
    });
  }
}


const webpack_build = () => {
  webpackConfig.mode = (process.argv.indexOf('--mode=prod') > 1) ? 'production' : 'development'

  print(`Building for ${webpackConfig.mode} environment ...`);

  webpack(webpackConfig // Configuration Object
    , (err, stats) => {
      if (err) console.log('## 1', err.toString())
      showStatErrors(stats);

      // Done processing
      console.log('Done');
    });
}


const webpack_watch = () => {
  print(`Starting server ...`);

  const compiler = webpack(webpackConfig);

  // compiler watch configuration see https://webpack.js.org/configuration/watch/
  const watchConfig = {
    aggregateTimeout: 300,
    poll: 1000
  };

  let serverControl;

  compiler.watch(watchConfig, (err, stats) => {
    if (err) {
      console.error('## 1', err.stack || err);
      if (err.details) {
        console.error('## 2', err.details);
      }
      return;
    }

    showStatErrors(stats);

    if (serverControl) {
      serverControl.kill();
    }

    console.log(`## RESULT: ${webpackConfig.output.path}/${webpackConfig.output.filename}`);
    serverControl = spawn('node', [`../webpack-httpserver.js`], { cwd: `${webpackConfig.output.path}`});

    serverControl.stdout.on('data', data => print(data.toString()));
    serverControl.stderr.on('data', data => console.error('## 5', data.toString()));
  });

}

if (process.argv[2] === 'build') webpack_build();
if (process.argv[2] === 'watch') webpack_watch();