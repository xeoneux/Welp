const webpack = require('webpack');
const fs = require('fs');
const path = require('path'),
    join = path.join,
    resolve = path.resolve;

const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = join(root, 'src');
const dest = join(root, 'dist');
const modules = join(root, 'node_modules');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

var config = getConfig({
    isDev: isDev,
    in: join(src, 'app.js'),
    out: dest,
    clearBeforeBuild: true
});

config.postcss = [].concat([
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({})
]);

module.exports = config;
