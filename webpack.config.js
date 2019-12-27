const path = require('path');
const {
  createDefaultConfig
} = require('@open-wc/building-webpack');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');

// if you need to support IE11 use "modern-and-legacy-config" instead.
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// module.exports = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });


// exports = createDefaultConfig({});


// module.exports = {
//    entry: path.resolve('./index.js'),
// output: {
//   filename: 'index.js',
//   path: path.resolve(__dirname, 'dist'),
//   publicPath: '/dist/'
// },
// module: {
//     rules: [{
//       test: /\.css|\.s(c|a)ss$/,
//       use: [{
//         loader: 'lit-scss-loader',
//         options: {
//           minify: true, // defaults to false
//         },
//       }, 'extract-loader', 'css-loader', 'sass-loader'],
//     }, ],
//   },
// };


module.exports = {
  
  entry: path.resolve(__dirname, './index.js'),

  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.js/,
        use: {
          loader: 'babel-loader'
        }
      },
    ],
  },

  plugins: [
    new WebpackIndexHTMLPlugin({
        minify: false,

      template: () => `
        <html>
          <head>
          
          </head>
          <body>
            <planet-clock-element color="purple" ></planet-clock-element>
          </body>
        </html>
      `,
    }),
  ],
};
