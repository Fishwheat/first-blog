module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  // 解决警告You are running the esm-bundler build of vue-i18n. ->
  // -> It is recommended to configure your bundler to explicitly replace feature flag globals ->
  // -> with boolean literals to get proper tree-shaking in the final bundle.
  chainWebpack: (config) => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },
};
