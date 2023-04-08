const path = require('path');

module.exports = {
    entry: './src/front/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'bundle')
    },
    devServer: {
        static: path.join(__dirname, 'bundle'),
        compress: true,
        port: 4000
    }
};
