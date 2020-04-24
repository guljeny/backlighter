const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './dist/client/'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Backlighter',
      template: './src/client/index.html',
    }),
  ],
}
