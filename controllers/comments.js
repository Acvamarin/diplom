const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Forms')

const router = new Router().prefix('/posts/:postId/comments')

router.post('/', passport.authenticate('jwt', { session: false }), async (postik) => {
  const post = await Post.findById(postik.params.postId)
  if (!post) {
    postik.throw(404, 'Пост не найден')
  }
  const { body } = postik.request.body
  post.comments.unshift({ body, user: postik.state.user._id })
  postik.body = await post.save()
})

router.delete('/:commentId', passport.authenticate('jwt', {
  session: false
}), async (postik) => {
  const post = await Post.findById(postik.params.postId)
  if (!post) {
    postik.throw(404, 'Пост не найден')
  }
  const commentIndex = post.comments
    .findIndex((c) => c._id.toString() === postik.params.commentId)
  if (commentIndex < 0) {
    postik.throw(404, 'Коммент не найден')
  }
  post.comments.splice(commentIndex, 1)
  postik.body = await post.save()
})

module.exports = router.routes()
