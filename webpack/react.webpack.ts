import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
const rootPath = path.resolve(__dirname, "..");

const config = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
        // https://github.com/dividab/tsconfig-paths-webpack-plugin
      }),
    ],
  },
  entry: path.resolve(rootPath, "src/renderer", "index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: { loader: "file-loader" },
      },
    ],
  },
  devServer: {
    static: path.join(rootPath, "dist/renderer"),
    devMiddleware: {
      publicPath: "/",
    },
    port: 4000,
    historyApiFallback: true,
    compress: true,
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./",
  },
  plugins: [new HtmlWebpackPlugin({ title: "Edes" })],
};

export default config;
