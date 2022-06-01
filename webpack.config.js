const Path = require('path')
const Webpackbar = require('webpackbar')
const WebpackNotifier = require('webpack-notifier')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Portfinder = require('portfinder')
const Dotenv = require('dotenv-webpack')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { extendDefaultPlugins } = require('svgo')

const BuildOutputPlugin = require('./webpack.output.plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    return {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                'svgo',
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                        {
                                            name: 'addAttributesToSVGElement',
                                            params: {
                                                attributes: [
                                                    {
                                                        xmlns: 'http://www.w3.org/2000/svg',
                                                    },
                                                ],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                vendor: {
                    name: 'react',
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    chunks: 'all',
                },
                responsive: {
                    name: 'responsive',
                    test: /[\\/]node_modules[\\/](react-responsive)[\\/]/,
                    chunks: 'all',
                },
                vendors: {
                    name: 'core-js',
                    test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                    chunks: 'all',
                },
                reduxToolkit: {
                    name: 'redux-toolkit',
                    test: /[\\/]node_modules[\\/](redux-toolkit)[\\/]/,
                    chunks: 'all',
                },
                sentry: {
                    name: 'sentry',
                    test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
                    chunks: 'all',
                },
                components: {
                    test: /[\\/]src[\\/]components[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                redux: {
                    test: /[\\/]src[\\/]redux[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                pages: {
                    test: /[\\/]src[\\/]pages[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                services: {
                    test: /[\\/]src[\\/]services[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
            },
        },
    }
}

const filename = (ext) =>
    isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`

const plugins = () => {
    const pluginsList = [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new WebpackNotifier({
            title: 'Webpack',
            alwaysNotify: false,
            excludeWarnings: true,
        }),
        new Webpackbar({
            color: 'red',
        }),
        new BuildOutputPlugin({
            clearConsole: true,
            showRelated: true,
        }),
        new Dotenv({
            path: isDev ? './.env.development' : './.env.production',
            allowEmptyValues: true,
        }),
    ]

    // if (isProd) {
    //     pluginsList.push(
    //         new BundleAnalyzerPlugin({
    //             analyzerMode: 'server',
    //             generateStatsFile: false,
    //             statsOptions: { source: false },
    //         })
    //     )
    // }

    return pluginsList
}

module.exports = (env) => {
    const envMode = process.env.NODE_ENV

    console.log('Mode:', envMode)

    console.log('Compiling page:', env.page)

    let devPort
    Portfinder.getPortPromise({
        port: 8000,
        stopPort: process.env.WEBPACK_DEV_SERVER_PORT,
    }).then((port) => {
        devPort = port
    })

    return {
        mode: envMode,
        entry: `./src/pages/${env.page}/index.tsx`,
        output: {
            filename: filename('js'),
            path: Path.resolve(__dirname, 'build'),
        },
        devServer: {
            port: devPort,
            hot: isDev,
        },
        stats: false,
        devtool: isDev ? 'source-map' : 'source-map',
        // optimization: isDev ? {} : optimization(),
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/i,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(css|s[ac]ss$)/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss', '.css', '.ts', '.tsx'],
        },
    }
}
