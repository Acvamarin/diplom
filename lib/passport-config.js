const { Strategy, ExtractJwt }  = require('passport-jwt')

const config = require('./config')
const User = require('../models/Users')

const password = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

module.exports = (pass) => {
  pass.use(new Strategy(password, async (e, log) => {
    const online = await User.findById(e.id)
    if (online) {
      log(null, online)
    } else {
      log(null, false)
    }
  }))
}
