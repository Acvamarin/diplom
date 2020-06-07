const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Forms')

const router = new Router().prefix('/posts')

router.post('/', passport.authenticate('jwt', { session: false }), async (postik) => {
  const { body } = postik.request.body
  const user = postik.state.user._id
  postik.body = await new Post({ body, user }).save()
  postik.status = 201
})

router.get('/', async (postik) => {
  const { query } = postik
  const { skip, limit } = query
  delete query.skip
  delete query.limit
  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query
  postik.set('x-total-count', await Post.countDocuments(q))
  postik.body = await Post
    .find(q)
    .sort({ createdDate: -1 })
    .skip(+skip)
    .limit(+limit)
})

router.get('/:id', async (postik) => {
  const post = await Post.findById(postik.params.id )
  if (post) {
    postik.body = post
  } else {
    postik.throw(404, 'Пост не найден')
  }
})

router.put('/', passport.authenticate('jwt', { session: false }), async (postik) => {
  const { _id, body } = postik.request.body
  const user = postik.state.user._id
  ctx.body = await Post.findOneAndUpdate(
    { _id, user },
    { $set: { body } },
    { new: true }
  )
})

router.delete('/:_id', passport.authenticate('jwt', { session: false }), async (postik) => {
  await Post.findOneAndRemove({
    _id: postik.params._id,
    user: postik.state.user._id
  })
  postik.body = { message: 'Пост удалён' }
})

module.exports = router.routes()
