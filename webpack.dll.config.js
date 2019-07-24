let path = require('path')
let webpack = require('webpack')

let vendors = [
  'moment'
]
let disPath = path.resolve(__dirname, './dist')

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: __dirname,
    // path: __dirname,
    filename: 'Dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
