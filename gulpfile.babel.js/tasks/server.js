/**
 * @title Server
 * @description A task to initialise a local server.
 */

// Dependencies
const bs = require('browser-sync').create();

// Config
const { paths } = require('../config');

function serve(cb) {
  bs.init({
    open: false,
    port: 3000,
    server: {
      baseDir: paths.dest
    },
    watch: true,
    notify: false,
  });
  cb();
}

function reload(cb) {
  bs.reload();
  cb();
}

exports.serve = serve;
exports.reload = reload;
