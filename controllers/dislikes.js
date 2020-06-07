const Router = require("koa-router");
const passport = require("koa-passport");

const Post = require("../models/Forms");

const router = new Router().prefix("/posts/:postId/dislikes");
router.delete(
  "/:dislikeId",
  passport.authenticate("jwt", { session: false }),
  async (postik) => {
    const post = await Post.findById(postik.params.postId);
    if (!post) {
      postik.throw(404, "Пост не найден");
    }
    const dislikeIndex = post.dislikes.findIndex(
      (l) => l._id.toString() === postik.params.dislikeId
    );
    if (dislikeIndex < 0) {
      postik.throw(404, "Пост не найден");
    }
    post.dislikes.splice(dislikeIndex, 1);
    postik.body = await post.save();
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (postik) => {
    const post = await Post.findById(postik.params.postId);
    if (!post) {
      postik.throw(404, "Пост не найден");
    }
    const user = postik.state.user._id;
    if (post.dislikes.find((l) => l.user.toString() === user.toString())) {
      postik.throw(400, "User already liked this post");
    }
    if (!post.likes.find((l) => l.user.toString() === user.toString())) {
      post.dislikes.unshift({ user });
      postik.body = await post.save();
    }

  }
);



module.exports = router.routes();
