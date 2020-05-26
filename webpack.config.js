const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './dist/client/'),
    filename: `bundle${process.env.NODE_ENV === 'production' ? '.[hash]' : ''}.js`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '$actions': path.resolve(__dirname, './client/actions/'),
      '$api': path.resolve(__dirname, './client/api/'),
      '$utils': path.resolve(__dirname, './client/utils/'),
      '$socket': path.resolve(__dirname, './client/socket/'),
      '$components': path.resolve(__dirname, './client/components/'),
      '$modules': path.resolve(__dirname, './client/modules/'),
      '$store': path.resolve(__dirname, './client/store.js'),
      '$styles': path.resolve(__dirname, './client/styles'),
      '$common': path.resolve(__dirname, './common/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: 'file-loader',
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      },
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
