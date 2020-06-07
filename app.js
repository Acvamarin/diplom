const Koa = require('koa')

const config = require('./lib/config')
const handlers = require('./handlers')
const controllers = require('./controllers')
const mongooseConfig = require('./lib/mongoose-config')

const koa = new Koa()

handlers.forEach((h) => koa.use(h))

koa.use(controllers.routes())
koa.use(controllers.allowedMethods())

module.exports = (callback) => {
  mongooseConfig()
  koa.listen(config.port, callback)
  return koa
}
