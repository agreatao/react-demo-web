const ENV = process.env.NODE_ENV;
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CONFIG = require(`./config/${ENV}.config`);

const DEFAULT_LESS = new ExtractTextWebpackPlugin({ filename: "css/default.css", allChunks: true });
const ANTD_LESS = new ExtractTextWebpackPlugin({ filename: "css/antd-[name].css", allChunks: true });
const PROJECT_LESS = new ExtractTextWebpackPlugin({ filename: "css/[name].css", allChunks: true });

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
        test: /\.json$/,
        exclude: /node_modules/,
        loader: "json-loader"
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
        include: path.join(__dirname, "node_modules/antd"),
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
        exclude: [path.join(__dirname, "src/theme"), path.join(__dirname, "node_modules")],
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
];

const STYLE_PLUGINS = [DEFAULT_LESS, ANTD_LESS, PROJECT_LESS];
const HTML_PLUGINS = [];
const ENTRY = {
    common: ["react", "react-dom", "antd", "dva"]
};
CONFIG.pages.forEach(name => {
    ENTRY[name] = path.join(__dirname, "src/modules", name, "index");
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
    devtool: 'source-map',
    entry: ENTRY,
    output: {
        path: path.resolve(__dirname, "dist/static"),
        publicPath: `${CONFIG.baseURL}/`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].[hash:8].chunk.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less"],
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, "src"),
            components: path.join(__dirname, "src/components"),
            hooks: path.join(__dirname, "src/hooks"),
            images: path.join(__dirname, "src/images"),
            models: path.join(__dirname, "src/models"),
            modules: path.join(__dirname, "src/modules"),
            templates: path.join(__dirname, "src/templates"),
            theme: path.join(__dirname, "src/theme"),
            utils: path.join(__dirname, "src/utils"),
        }
    },
    optimization: {
        splitChunks: {
            name: "common"
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