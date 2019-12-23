const path = require('path');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './index.js'),

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  module: {
    rules: [{
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: false, // defaults to false
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
};
