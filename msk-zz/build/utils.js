const path = require("path");
const glob = require("glob");
const fs = require("fs");

const __cwd = process.cwd();

module.exports = {
    getEntry(globPath) {
        const chunks = {};
        glob.sync(globPath).forEach((chunkPath) => {
            const chunkName = chunkPath.replace(/\.\/src\/pages\//, "");
            chunks[chunkName] = {
                entry: path.join(__cwd, chunkPath),
                template: fs.existsSync(path.join(__cwd, chunkPath, "index.html"))
                    ? path.join(__cwd, chunkPath, "index.html")
                    : path.join(__cwd, "public/index.html"),
                filename: `${chunkName}.html`,
            };
        });
        return chunks;
    },
};
