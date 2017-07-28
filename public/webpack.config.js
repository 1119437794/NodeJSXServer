/**
 * Created by pinguo on 2017/7/18.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // https://segmentfault.com/q/1010000008889633?_ea=1768854
    // devtool: 'cheap-source-map', // 方便debug
    // TODO 必须是路径吗？！
    entry: __dirname + '/build/Index.jsx',

    output: {
        path: __dirname + '/asserts/',
        filename: `bundle.${process.env.hash}.js`
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.jsx$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        },
                    }
                ],
            }
        ]
    },

    plugins: [
        // http://blog.csdn.net/u013240543/article/details/51792261
        // http://www.cnblogs.com/wonyun/p/6030090.html
        new HtmlWebpackPlugin({
            title: '自定义后台',
            filename: 'bundle.html',
            template: __dirname + '/asserts/tpl.html',
            inject: true
        }),

        // clean-webpack 需要关闭source-map,否则会产生.msp
        new CleanWebpackPlugin(['./asserts/bundle.*.js']),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx','.css','.less','.scss'] //require 的时候，可以不用写文件类型
    }
}
