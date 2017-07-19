/**
 * webpack.config.dll.js
 * 打包过程报错，将全局的webpack升级解决
 * */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        //公共组件
        lib: [
            'react',
            'react-dom',
        ],
    },

    output: {
        path: path.join(__dirname, 'asserts'),
        filename: '[name].js',
        library: '[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'manifest.json'),
            name: '[name]',
            context: __dirname,
        })
    ]
};