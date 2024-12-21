const path = require('path');
const Sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');


module.exports = (env, argv) => {

    const resolveDir = (dir) => path.resolve(__dirname, dir);
    const buildFolder = resolveDir('dist');
    const isProduction = argv.mode === 'production';

    return {
        target: 'web',
        devtool: !isProduction && 'source-map',
        entry: [
            resolveDir('src/scripts/main.ts'),
            resolveDir('src/styles/main.scss')
        ],
        output: {
            filename: 'bundle.js',
            path: buildFolder,
            clean: true
        },
        resolve: {
            extensions: [
                '.jsx',
                '.js',
                '.tsx',
                '.ts'
            ],
            alias: {
                '@': resolveDir('src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.scss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        }, {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'autoprefixer',
                                        'cssnano',
                                        'postcss-preset-env'
                                    ]
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: Sass
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                    type: 'asset/resource',
                    exclude: resolveDir('src/images'),
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    exclude: resolveDir('src/fonts'),
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'bundle.css'
            }),
            new HtmlWebpackPlugin({
                template: resolveDir('src/templates/index.html'),
                inject: 'body'
            }),
            ...(isProduction || env.lint ? [
                new StylelintPlugin(),
                new ESLintPlugin({
                    configType: 'flat'
                }),
            ] : [])
        ],
        optimization: {
            minimize: isProduction
        },
        cache: true,
        stats: 'minimal',
        devServer: {
            static: {
                directory: buildFolder
            },
            compress: isProduction,
            port: 9000,
            watchFiles: [
                './src/*.html'
            ],
            open: true
        }
    }
}