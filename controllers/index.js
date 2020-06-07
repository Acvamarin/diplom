const Router = require('koa-router')

const auth = require('./authetication')
const posts = require('./forms')
const postsComments = require('./comments')
const postsLikes = require('./likes')
const postsDisLikes = require("./dislikes");
const subscriptions = require('./subscrip')
const users = require('./users')

const router = new Router().prefix('/network')

router.use(auth, posts, postsComments, postsLikes,postsDisLikes, subscriptions, users)

module.exports = router
