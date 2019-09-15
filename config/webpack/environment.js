const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const vue = require('./loaders/vue');
const haml = require('./loaders/haml');

process.env.RAILS_RELATIVE_URL_ROOT = process.env.RAILS_RELATIVE_URL_ROOT || "/";

environment.config.merge({
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
});

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))
environment.loaders.prepend('vue', vue);
environment.loaders.prepend('haml', haml);

/*
** CSS loader fixing issue, See https://github.com/rails/webpacker/issues/2162
*/
environment.loaders.get('css').use=[{'loader':'vue-style-loader'}, {'loader': 'css-loader'}];
environment.loaders.get('sass').use=[{'loader':'vue-style-loader'}, {'loader': 'css-loader'}, {'loader': 'sass-loader'}];

module.exports = environment;
