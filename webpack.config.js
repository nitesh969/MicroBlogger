var path = require('path');

module.exports = {
    entry: './script.js',
    output: {
        path: path.resolve(__dirname, 'dist') + "/app",
        filename: 'bundle.js',
        publicPath: "/app/"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};