const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
       title: '后台管理系统',
     }),
   ],
   output: {
     filename: '[name].[contenthash].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
   resolve: {
        alias: {
        // this isn't technically needed, since the default `vue` entry for bundlers
        // is a simple `export * from '@vue/runtime-dom`. However having this
        // extra re-export somehow causes webpack to always invalidate the module
        // on the first HMR update and causes the page to reload.
          vue: "vue/dist/vue.esm-bundler.js",
          '@': path.resolve('src'),
        },
        fallback: { "path": require.resolve("path-browserify") },
        symlinks: false,
        extensions: ['.tsx', '.ts', '.js'],
    },
   module: {
    rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
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
        },
    ]
  }
};