const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  // mode: "development",
  entry: "./src/index.js",
  // The above is optional; that's the default entry anyway
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "bundle.js", // By default it's main.js
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    port: 3000, // By default starts at 8080
    open: true, // Opens in the browser immediately
    hot: true, // Hot reloading
    compress: true, // Optimization
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },

  module: {
    // This is for css-loader; each loader needs an object
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
