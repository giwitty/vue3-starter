'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = '' // 页面标题

const port = 9527 // dev port

// 请在 https://cli.vuejs.org/config/ 查询相关配置
module.exports = {
    /**
     * 有子路径的时候请设置publicPath，如‘/app/’
     * 详情: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/public/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // devServer: {
    //     port: port,
    //     open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     },
    //     proxy: {
    //
    //     }
    // },
    configureWebpack: {
        // 别名注册，可以用在index.html中
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // 可提高首页速度
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        // 当多有个页面的时候会产生无意义请求
        config.plugins.delete('prefetch')

        // // 设置svg-loader
        // config.module
        //     .rule('svg')
        //     .exclude.add(resolve('src/icons'))
        //     .end()
        // config.module
        //     .rule('icons')
        //     .test(/\.svg$/)
        //     .include.add(resolve('src/icons'))
        //     .end()
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icon-[name]'
        //     })
        //     .end()

        // config
        //     .when(process.env.NODE_ENV !== 'development',
        //         config => {
        //             config
        //                 .plugin('ScriptExtHtmlWebpackPlugin')
        //                 .after('html')
        //                 .use('script-ext-html-webpack-plugin', [{
        //                     // `runtime` must same as runtimeChunk name. default is `runtime`
        //                     inline: /runtime\..*\.js$/
        //                 }])
        //                 .end()
        //             config
        //                 .optimization.splitChunks({
        //                 chunks: 'all',
        //                 cacheGroups: {
        //                     libs: {
        //                         name: 'chunk-libs',
        //                         test: /[\\/]node_modules[\\/]/,
        //                         priority: 10,
        //                         chunks: 'initial' // 只打包最初依赖的第三方
        //                     },
        //                     elementUI: {
        //                         name: 'chunk-elementUI', // 将elementUI拆分为单个包
        //                         priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //                         test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        //                     },
        //                     commons: {
        //                         name: 'chunk-commons',
        //                         test: resolve('src/components'), // can customize your rules
        //                         minChunks: 3, //  minimum common number
        //                         priority: 5,
        //                         reuseExistingChunk: true
        //                     }
        //                 }
        //             })
        //             // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
        //             config.optimization.runtimeChunk('single')
        //         }
        //     )
    }
}
