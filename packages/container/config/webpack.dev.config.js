const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../package.json').dependencies;

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    output: {
        publicPath: 'http://localhost:8080/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                products: 'products@http://localhost:8081/remoteEntry.js',
                cart: 'cart@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
                shared: 'shared@http://localhost:8084/remoteEntry.js',
                auth: 'auth@http://localhost:8085/remoteEntry.js',
            },
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
                'react-router-dom': { singleton: true },
                vue: { singleton: true },
            },
        }),
        new HtmlWebpackPlugin({
              template: './public/index.html',
        }),
    ],
};