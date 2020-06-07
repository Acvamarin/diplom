const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Forms')

const router = new Router().prefix('/posts/:postId/likes')

router.post('/', passport.authenticate('jwt', { session: false }), async (postik) => {
  const post = await Post.findById(postik.params.postId)
  if (!post) {
    postik.throw(404, 'Постн не найден')
  }
  const user = postik.state.user._id
  if (post.likes.find((l) => l.user.toString() === user.toString())) {
    postik.throw(400, 'Пользователь лайкнул')
  }
  if (!post.dislikes.find((l) => l.user.toString() === user.toString())) {
    post.likes.unshift({ user })
    postik.body = await post.save()
  }


})

router.delete('/:likeId', passport.authenticate('jwt', { session: false }), async (postik) => {
  const post = await Post.findById(ctx.params.postId)
  if (!post) {
    postik.throw(404, 'Пост не найден')
  }
  const likeIndex = post.likes.findIndex((l) => l._id.toString() === postik.params.likeId)
  if (likeIndex < 0) {
    postik.throw(404, 'Лайк не найден')
  }
  post.likes.splice(likeIndex, 1)
  postik.body = await post.save()
})

module.exports = router.routes()
