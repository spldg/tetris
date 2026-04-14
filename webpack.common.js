import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    entry: './src/main.js',

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    }
}