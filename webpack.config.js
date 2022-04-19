const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  mode: "development",
  performance: { hints: false },
  output: {
    filename: 'eth.min.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    new NodePolyfillPlugin({
			excludeAliases: ["console"]
		})
  ],
  devServer: {
    static: './docs'
  },
};