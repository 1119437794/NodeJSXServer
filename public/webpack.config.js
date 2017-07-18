/**
 * Created by pinguo on 2017/7/18.
 */

module.exports = {
    entry: __dirname + '/build/Index.jsx',

    output: {
        path: __dirname + '/asserts/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
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

    resolve: {
        extensions: ['', '.js', '.jsx','.css','.less','.scss'] //require 的时候，可以不用写文件类型
    }
}
