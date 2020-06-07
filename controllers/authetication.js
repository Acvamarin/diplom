const Router = require("koa-router");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const config = require("../lib/config");

const router = new Router().prefix("/auth");

router.post("/registration", async (c) => {
  const {
    name,
    email,
    password,
    lastName,
    status,
    happyBirthday,
    placeLes,
  } = c.request.body;
  const visitor = await User.findOne({ email });
  if (visitor) {
    c.throw(400, "Неверный емаил");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await new User({
    email,
    name,
    lastName,
    status,
    happyBirthday,
    placeLes,
    password: hash,
  }).save();
  c.status = 201;
});

router.post("/login", async (c) => {
  const { email, password } = c.request.body;
  const visitor = await User.findOne({ email });
  if (!visitor) {
    c.throw(400, "такой емаил уже есть");
  }
  const isMatch = await bcrypt.compare(password, visitor.password);
  if (isMatch) {
    const payload = {
      id: visitor.id,
      name: visitor.name,
      email: visitor.email,
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: 3600 * 24 });
    c.body = { token: ` ${token}` };
  } else {
    c.throw(400, "Неправильный пароль");
  }
});

module.exports = router.routes();
