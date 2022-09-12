const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: __dirname + '/index.js',
    devtool: "source-map",
    optimization:{
        minimize: false // 关闭代码压缩，可选
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            ['@babel/plugin-proposal-class-properties']
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "html/index.html",
            template: "./index.html",
            hash: true,
            minify: {
                removeEmptyAttributes: false
            }
        })
    ]
};
