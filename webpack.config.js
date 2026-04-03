const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode:'development',

    entry: './src/index.js',

    output: {
      path:  path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    stats: 'minimal',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    devServer: {
        static: './dist',
        port:3000,
        open: true,
        hot: true,
    }
}