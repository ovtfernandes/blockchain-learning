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
            {
                test: /\.sol/,                                                                                                                                               
                use: [                                                                  
                    {                                                                     
                        loader: 'json-loader',                                               
                    },                                                                    
                    {                                                                     
                        loader: 'truffle-solidity-loader',                                  
                        options: {                                                          
                            network: 'development',                                           
                            migrations_directory: path.resolve(__dirname, './migrations'),    
                            contracts_build_directory: path.resolve(__dirname, './build/contracts'),
                        },
                    },
                ],
            },
        ],
    },
};
