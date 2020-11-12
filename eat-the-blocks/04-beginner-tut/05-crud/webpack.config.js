const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
  },
};
