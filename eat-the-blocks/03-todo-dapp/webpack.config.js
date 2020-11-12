const path = require('path');

module.exports = {
    entry: './server/app/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'server/app/dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
