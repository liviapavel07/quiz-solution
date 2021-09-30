import path from 'path';

module.exports = () => ({
    target: 'web',
    entry: './src/index.tsx',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    optimization: { splitChunks: { chunks: 'all' } },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'script-loader'
                }
            },
            {
                test: /\.css$/,
                include: [/node_modules/, /src/],
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.scss$/,
                include: [/src/],
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { includePaths: ['src/components'], javascriptEnabled: true }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
        alias: {
            '@quiz/types': path.resolve('src/core'),
            '@quiz/test': path.resolve('test'),
            '@quiz': path.resolve('src')
        }
    }
});