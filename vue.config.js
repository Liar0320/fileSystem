const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // https://cli.vuejs.org/config/#publicpath
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  /**https://www.jianshu.com/p/303c220e213d */
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    modules: false,
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      less: {},
    },
  },
  devServer: {
    port: 4141,
    host: '0.0.0.0',
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  transpileDependencies: [
    // './node_modules/_aos@3.0.0-beta.6@aos/src/js/helpers/elements.js',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        src: '@',
        pages: '@/pages',
        services: '@/services',
        models: '@/models',
      },
    },
  },
  chainWebpack: config => {
    // #region 忽略生成环境打包的文件
    if (process.env.NODE_ENV === 'production') {
      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true,
        })
        .tap(args => {});

      // #endregion

      // #region 启用第三方cdn加速
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        'vue-i18n': 'VueI18n',
        aos: 'AOS',
        // vuex: 'Vuex',
      };

      config.externals(externals);
      const cdn = {
        css: [
          // '//cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css',
        ],
        js: [
          // vue
          '//unpkg.com/vue@2.5.22/dist/vue.min.js',
          // vue-router
          '//unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
          // vuex
          // '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // axios
          '//unpkg.com/axios@0.19.2/dist/axios.min.js',
        ],
      };

      config.plugin('html').tap(args => {
        args[0].cdn = cdn;

        return args;
      });
      // #endregion
    }
    // #endregion
  },
  productionSourceMap: false,
};
