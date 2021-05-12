const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    // Use env.<YOUR VARIABLE> here:
    console.log('Goal: ', env.goal); // 'local'
    console.log('Production: ', env.production); // true

    return {
        mode: 'development',
        entry: {
            index: './src/index.js',
        },
        devtool: 'eval-source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
        },
        plugins: [
            // 请确保引入这个插件！
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: 'development',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            moduleIds: 'deterministic', // 修复vendor hash 发生变化
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        resolve: {
            alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            vue: "@vue/runtime-dom"
            },
            symlinks: false
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    include: path.resolve(__dirname, 'src'), // 通过使用 include 字段，仅将 loader 应用在实际需要将其转换的模块
                    loader: 'vue-loader'
                },
                {
                    test: /\.pug$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'pug-plain-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                    'vue-style-loader', 'style-loader', 'css-loader'
                    ]
                }
            ]
        },
    }
};