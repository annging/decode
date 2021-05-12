const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
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
});