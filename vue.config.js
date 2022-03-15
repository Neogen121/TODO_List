const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: process.env.NODE_ENV === "production" ? "/todo_list/" : "/",
    productionSourceMap: false,
    filenameHashing: false,
});
