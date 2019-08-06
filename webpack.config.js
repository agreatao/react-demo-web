const NODE_ENV = process.env.NODE_ENV;
const CONFIG = require(`./config/${NODE_ENV}.config.js`);

const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const DEFAULT_LESS = new ExtractTextWebpackPlugin({
    filename: "css/default.css",
    allChunks: true
});

const ANTD_LESS = new ExtractTextWebpackPlugin({
    filename: "css/antd-[name].css",
    allChunks: true
});

const PROJECT_LESS = new ExtractTextWebpackPlugin({
    filename: "css/[name].css",
    allChunks: true
});

let entry = {
    vendor: [
        "react",
        "react-dom",
        "redux",
        "react-redux",
        "react-router",
        "redux-thunk",
        "add-dom-event-listener",
        "moment",
        "axios",
        path.join(__dirname, "src/theme/index.js")
    ]
};
let HTML_WEBPACK_PLUGINS = [];

const PAGES = CONFIG.pages;
PAGES &&
    PAGES.forEach(page => {
        entry[page] = [
            "babel-polyfill",
            "antd",
            path.join(__dirname, "src/modules", page, "app")
        ];
        HTML_WEBPACK_PLUGINS.push(
            new HtmlWebpackPlugin({
                title: CONFIG.title,
                template: path.join(__dirname, "src/template", "index.html"),
                filename: `../templates/${page}.html`,
                inject: true,
                chunks: ["vendor", page],
                minify:
                    NODE_ENV == "production"
                        ? {
                            removeAttributeQuotes: true,
                            collapseWhitespace: true
                        }
                        : false
            })
        );
    });

module.exports = {
    devtool: "source-map",
    entry,
    output: {
        path: path.resolve(__dirname, "dist/static"),
        publicPath: `${CONFIG.baseURL}/`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].chunk.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less"],
        modules: [path.join("node_modules")],
        alias: {
            "@": path.join(__dirname, "src"),
            api: path.join(__dirname, "src/api"),
            commons: path.join(__dirname, "src/commons"),
            components: path.join(__dirname, "src/components"),
            dic: path.join(__dirname, "src/dic"),
            images: path.join(__dirname, "src/images"),
            lib: path.join(__dirname, "src/lib"),
            modules: path.join(__dirname, "src/modules"),
            store: path.join(__dirname, "src/store"),
            theme: path.join(__dirname, "src/theme"),
            utils: path.join(__dirname, "src/utils"),
            hgis: path.join(__dirname, "src/hgis")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|svg|gif|ico)$/,
                include: [path.join(__dirname, "src/images")],
                loader: "file-loader",
                options: {
                    limit: 512,
                    name: "images/[name].[hash].[ext]"
                }
            },
            {
                test: /\.svg$/,
                include: [
                    path.join(__dirname, "src/components/tree_icon"),
                    path.join(__dirname, "src/components/lida_icon")
                ],
                loader: "raw-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(woff2?|svg|ttf|eot)$/,
                exclude: [
                    path.join(__dirname, "src/components/tree_icon"),
                    path.join(__dirname, "src/components/lida_icon"),
                    path.join(__dirname, "src/images")
                ],
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.less/,
                include: path.join(__dirname, "src/theme"),
                loader: DEFAULT_LESS.extract({
                    fallback: "style-loader",
                    use: [
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
                                javascriptEnabled: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less/,
                include: [path.join(__dirname, "node_modules/antd")],
                loader: ANTD_LESS.extract({
                    fallback: "style-loader",
                    use: [
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
                                javascriptEnabled: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less/,
                include: [
                    path.join(__dirname, "src/commons"),
                    path.join(__dirname, "src/components"),
                    path.join(__dirname, "src/modules"),
                    path.join(__dirname, "src/hgis")
                ],
                loader: PROJECT_LESS.extract({
                    fallback: "style-loader",
                    use: [
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
                                javascriptEnabled: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV)
            },
            CONFIG: JSON.stringify(CONFIG)
        }),
        new CleanWebpackPlugin(["dist"]),
        new CopyWebpackPlugin([

        ]),
        new webpack.optimize.CommonsChunkPlugin({
            // 公共代码提取
            name: ["vendor"],
            filename: "js/[name].js",
            minChunks: Infinity
        }),
        ...HTML_WEBPACK_PLUGINS,
        DEFAULT_LESS,
        ANTD_LESS,
        PROJECT_LESS
    ].concat(
        NODE_ENV == "production"
            ? [
                /**
                 * 生产模式下的配置
                 */
                new webpack.optimize.UglifyJsPlugin({
                    //删除注释
                    output: {
                        comments: false
                    },
                    // js代码压缩
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }),
                new OptimizeCssAssetsWebpackPlugin({
                    // css代码压缩
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require("cssnano"),
                    cssProcessorPluginOptions: {
                        preset: ["default", { discardComments: { removeAll: true } }]
                    },
                    canPrint: true
                })
            ]
            : []
    )
};
