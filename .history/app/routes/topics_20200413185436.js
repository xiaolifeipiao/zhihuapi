const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require("koa-jwt");
const router = new Router({ prefix: "/topics" });
const { find, findById, create, update } = require("../controllers/topics");

const auth = jwt({ secret });
// 获取用户
router.get("/", find);

module.exports = router;
