const ENV = process.env.NODE_ENV;
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CONFIG = require(`./config/${ENV}.config`);

const LOADERS = [
    {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: [
                "@babel/transform-runtime",
                ["import", { "libraryName": "antd", "style": true }],

                // // Stage 0
                // "@babel/plugin-proposal-function-bind",

                // // Stage 1
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-logical-assignment-operators",
                ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
                ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
                ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
                "@babel/plugin-proposal-do-expressions",

                // // Stage 2
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-throw-expressions",

                // // Stage 3
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
                    publicPath: `${CONFIG.baseURL}/`,
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
                    modifyVars: {
                        "border-radius-base": "2px",
                        "primary-color": "#33cccc"
                    }
                }
            }
        ],
    }
];

const STYLE_PLUGINS = [
    new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
    })
];
const HTML_PLUGINS = [];
const ENTRY = {
    common: ["react", "react-dom", "dva", "dva-loading", "axios", "react-intl", "moment", "add-dom-event-listener"],
};
CONFIG.pages.forEach(name => {
    ENTRY[name] = [path.join(__dirname, "src/modules", name, "index")];
    HTML_PLUGINS.push(new HtmlWebpackPlugin({
        title: CONFIG.title || "",
        template: path.join(__dirname, "src/templates", "index.html"),
        filename: `../templates/${name}.html`,
        inject: true,
        chunks: ["runtime", `vendors~common~${name}`, "common", name, `vendors~${name}`],
        minify: ENV === 'production' ? {
            removeRedundantAttributes: true, // 删除多余的属性
            collapseWhitespace: true, // 折叠空白区域
            removeAttributeQuotes: true, // 移除属性的引号
            removeComments: true, // 移除注释
            collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
        } : false
    }))
})

module.exports = {
    mode: ENV,
    devtool: ENV === 'development' ? 'cheap-module-eval-source-map' : false,
    entry: ENTRY,
    output: {
        path: path.resolve(__dirname, "dist/static"),
        publicPath: `${CONFIG.baseURL}/`,
        filename: "js/[name].[contenthash:8].js",
        chunkFilename: "js/[name].[contenthash:8].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less"],
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, "src"),
            components: path.join(__dirname, "src/components"),
            hooks: path.join(__dirname, "src/hooks"),
            i18n: path.join(__dirname, "src/i18n"),
            images: path.join(__dirname, "src/images"),
            models: path.join(__dirname, "src/models"),
            modules: path.join(__dirname, "src/modules"),
            services: path.join(__dirname, "src/services"),
            templates: path.join(__dirname, "src/templates"),
            theme: path.join(__dirname, "src/theme"),
            utils: path.join(__dirname, "src/utils"),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
        // minimizer: ENV === 'production' ? [ // 用于配置 minimizers 和选项
        //     new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true,
        //         sourceMap: true // set to true if you want JS source maps
        //     }),
        //     new OptimizeCSSAssetsPlugin({})
        // ] : []
    },
    module: {
        rules: LOADERS
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(ENV)
            },
            "CONFIG": JSON.stringify(CONFIG)
        }),
        new CleanWebpackPlugin(["dist"]),

        ...STYLE_PLUGINS,
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
        ...HTML_PLUGINS
    ]
}