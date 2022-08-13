//const { webpack } = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./client/index.js"),
  output: {
    // * changed "./build" to "build"
    path: path.resolve(__dirname, "build"),
    // * added public path below
    publicPath: '/',
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: {
      // * changed public path from "/build" to "/"
      publicPath: "/",
      directory: path.join(__dirname, "build"),
    },
  },
};
