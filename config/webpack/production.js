process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

process.env.RAILS_RELATIVE_URL_ROOT = "/trend"

module.exports = environment.toWebpackConfig()
