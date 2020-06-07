const Router = require('koa-router')
const passport = require('koa-passport')

const Subscription = require('../models/Subcrip')

const router = new Router().prefix('/subscriptions')

router.post('/', passport.authenticate('jwt', {
  session: false
}), async (sub) => {
  const { profile } = sub.request.body
  const subscriber = sub.state.user._id
  const checkSubscription = await Subscription.findOne({ subscriber, profile })
  if (checkSubscription) {
    sub.throw(400, 'Ты подписан')
  }
  sub.body = await new Subscription({ subscriber, profile }).save()
  sub.status = 201
})

router.get('/', async (sub) => {
  sub.body = await Subscription.find(sub.query)
})

router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), async (sub) => {
  await Subscription.findOneAndDelete({
    _id: sub.params._id,
    subscriber: sub.state.user._id
  })
  sub.body = { message: 'Ты не подписан' }
})

module.exports = router.routes()