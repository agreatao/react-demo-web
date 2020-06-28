const ENV = process.env.NODE_ENV;
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CONFIG = require(`./config/${ENV}.config`);

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        proxy: {
            '/calculate': {
                target: 'http://localhost:80'
            },
            '/alibaba': {
                target: 'http://localhost:80'
            },
            '/userInfo': {
                target: 'http://localhost:80'
            }
        }
    },
    mode: ENV,
    devtool: ENV === 'development' ? 'cheap-module-source-map' : false,
    entry: {
        common: ["react", "react-dom", "react-router", "react-intl", "redux", "redux-thunk", "react-redux", "axios", "moment", "add-dom-event-listener"],
        index: path.join(__dirname, 'src/main/index')
    },
    output: {
        path: path.resolve(__dirname, "dist/static"),
        publicPath: `${CONFIG.context}/`,
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[hash:8].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less"],
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, "src"),
            api: path.join(__dirname, 'src/api'),
            components: path.join(__dirname, "src/components"),
            images: path.join(__dirname, "src/assets/images"),
            main: path.join(__dirname, 'src/main'),
            pages: path.join(__dirname, 'src/pages'),
            store: path.join(__dirname, "src/store"),
            theme: path.join(__dirname, "src/theme"),
            utils: path.join(__dirname, "src/utils"),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/env", "@babel/react"],
                    plugins: [
                        "@babel/transform-runtime",
                        ["import", { "libraryName": "antd", "style": true }],
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-logical-assignment-operators",
                        ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
                        ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
                        ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
                        "@babel/plugin-proposal-do-expressions",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { "loose": false }],
                        "@babel/plugin-proposal-json-strings"
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|svg|gif|ico)$/,
                include: path.join(__dirname, "src/images"),
                loader: "file-loader",
                options: {
                    limit: 512,
                    name: "images/[name].[ext]"
                }
            },
            {
                test: /\.svg$/,
                include: path.join(__dirname, "src/svg"),
                loader: "raw-loader"
            },
            {
                test: /\.(woff2?|svg|ttf|eot)$/,
                include: path.join(__dirname, "src/theme"),
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: `${CONFIG.context}/`,
                            hmr: ENV === 'development',
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: [require("autoprefixer")]
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            // modifyVars: {
                            //     "border-radius-base": "2px",
                            //     "primary-color": "#33cccc"
                            // }
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(ENV)
            },
            "CONFIG": JSON.stringify(CONFIG)
        }),
        new CleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        new CopyWebpackPlugin([
            { from: 'public/file', to: 'file' },
            { from: 'src/assets/i18n', to: 'i18n' }
        ]),
        new OptimizeCSSAssetsPlugin({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),

            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: { removeAll: true }, //对注释的处理
                    normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                }]
            },
            canPrint: true  // 是否打印编译过程中的日志
        }),
        new HtmlWebpackPlugin({
            title: CONFIG.title || "",
            template: path.join(__dirname, "public", "index.html"),
            filename: ENV === 'production' ? `../templates/index.html` : 'index.html',
            inject: true,
            chunks: ["runtime", `vendors~common~index`, "common", 'index', `vendors~index`],
            minify: ENV === 'production' ? {
                removeRedundantAttributes: true, // 删除多余的属性
                collapseWhitespace: true, // 折叠空白区域
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
            } : false
        })
    ]
}