const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './dist/client/'),
    filename: `bundle${process.env.NODE_ENV === 'production' ? '.[hash]' : ''}.js`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '$actions': path.resolve(__dirname, 'src/client/actions/'),
      '$api': path.resolve(__dirname, 'src/client/api/'),
      '$utils': path.resolve(__dirname, 'src/client/utils/'),
      '$socket': path.resolve(__dirname, 'src/client/socket/'),
      '$common_utils': path.resolve(__dirname, 'src/utils/'),
      '$components': path.resolve(__dirname, 'src/client/components/'),
      '$modules': path.resolve(__dirname, 'src/client/modules/'),
      '$store': path.resolve(__dirname, 'src/client/store.js'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
}
