const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "flawlessWidgetLibrary.js",
    path: path.resolve(__dirname, "dist"),
    library: "flawlessWidgetLibrary",
    libraryTarget: "umd",
    globalObject: "globalThis", // 🔥 Automatically assigns to the correct global scope
  },
  mode: "production",
  module: {
    rules: [
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
};
