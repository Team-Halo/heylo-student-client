module.exports = {
    publicPath: "",
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.xml$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ],
        },
    }
};
