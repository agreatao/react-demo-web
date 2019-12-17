const ENV = process.env.NODE_ENV;
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        filename: 'css/[name].css'
    })
];
const HTML_PLUGINS = [];
const ENTRY = {
    common: ["react", "react-dom", "dva"]
};
CONFIG.pages.forEach(name => {
    ENTRY[name] = ["antd", path.join(__dirname, "src/modules", name, "index")];
    HTML_PLUGINS.push(new HtmlWebpackPlugin({
        title: CONFIG.title || "",
        template: path.join(__dirname, "src/templates", "index.html"),
        filename: `../templates/${name}.html`,
        inject: true,
        chunks: ["common", name]
    }))
})

module.exports = {
    mode: ENV,
    devtool: ENV === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    entry: ENTRY,
    output: {
        path: path.resolve(__dirname, "dist/static"),
        publicPath: `${CONFIG.baseURL}/`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
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
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0  // 表示提取公共部分最小的大小 
                }
            }
        }
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
        ...HTML_PLUGINS
    ]
}