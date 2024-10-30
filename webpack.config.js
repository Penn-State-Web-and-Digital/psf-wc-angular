const CustomResolverPlugin = require("@psu-flex/wp-wc-resolver");
const webpack = require("webpack");

module.exports = {
  plugins: [new webpack.ProvidePlugin({ process: "process/browser" })],
  resolve: {
    plugins: [new CustomResolverPlugin()],
  },
};
