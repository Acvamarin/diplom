const Router = require("koa-router");

const User = require("../models/Users");

const router = new Router().prefix("/users");

router.get("/:_id", async (visitor) => {
  const vis = await User.findById(visitor.params._id);
  if (vis) {
    visitor.body = vis;
  } else {
    visitor.throw(404);
  }
});





module.exports = router.routes();
