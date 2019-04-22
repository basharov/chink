const path = require('path');

module.exports = {
    entry: './src/client/chink.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'chink.js',
        path: path.resolve(__dirname, 'dist')
    }
};