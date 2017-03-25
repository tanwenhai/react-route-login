const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');
config.entry.unshift("webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

let compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
});

server.app.all('*', (req, res, next) => {
  let newReq = Object.assign({}, req, {url: '/'});
  return server.middleware(newReq, res, next);
})

server.listen(3000);