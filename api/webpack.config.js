const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "production",
    target: "node",
    node: {
        __dirname: false
    },
    entry: {
        app: ["./src/app.js"]
    },
    output: {
        path: path.resolve(__dirname, "bundle"),
        filename: "bundle.js",
        publicPath: 'bundle/'
    },
    externals: [nodeExternals({ whitelist: 'webpack/hot/poll?1000'})]
};
