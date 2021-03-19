
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        inline: true,
        contentBase: "./public",
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.js/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "react"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            }
        ]
    }
}