    const { merge } = require("webpack-merge");
    const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
    const commonConfig = require("./webpack.common");
    const packageJson = require("../package.json");

    const devConfig = {
    mode: "development",
    devServer: {
        host: "0.0.0.0",
        port: 8081,
        historyApiFallback: {
        index: "index.html",
        },
        compress: true,
        disableHostCheck: true
    },
    plugins: [
        new ModuleFederationPlugin({
        name: "marketing",
        filename: "remoteEntry.js",
        exposes: {
            "./core": "./src/bootstrap",
        },
        shared: packageJson.dependencies,
        }),
    ],
    };

    module.exports = merge(commonConfig, devConfig);
