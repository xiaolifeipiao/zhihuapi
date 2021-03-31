const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require("koa-jwt");
const router = new Router({ prefix: "/topics" });
const { secret } = require("../config");
const {
    find,
    findById,
    create,
    update,
    checkTopicExist,
} = require("../controllers/topics");

const auth = jwt({ secret });
// 获取用户
router.get("/", find);
router.post("/", auth, create);
router.get("/:id", auth, checkTopicExist, findById);
router.patch("/:id", auth, update);

module.exports = router;
