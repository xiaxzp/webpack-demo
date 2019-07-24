const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let disPath = path.resolve(__dirname, './dist')

module.exports = {
  mode: 'development',
  entry:  {
    index:__dirname + "/js/script.js"//已多次提及的唯一入口文件
  },
  output: {
    path: __dirname +"/dist",//打包后的文件存放的地方
    filename: "bundles.js"//打包后输出文件的文件名
  },
  devServer: { //webpack-dev-server
    devtool: 'eval-source-map',
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [ {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true, // 指定启用css modules
                    localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                }
            }
        ]
    },{
      test: /\.html$/,
        use: [
          // 应用多个 loader 和选项
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
             
            }
          }
        ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: true,
      minify: {
        removeComments: true
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, 'manifest.json')
    }),
    new HtmlWebpackTagsPlugin({ tags: ['DLL.js'], append: false }),
    new CopyPlugin([
      { from: path.join(__dirname, 'DLL.js'), to: __dirname +"/dist" },
    ]),
  ]
}