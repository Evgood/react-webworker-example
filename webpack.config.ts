import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config = {
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[chunkhash].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "static", "template.html"),
    }),
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};

export default config;
