const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require("koa-jwt");
const router = new Router({
    prefix: "/questions/:questionId/answers/:answerId/comments",
});
const {
    find,
    findById,
    create,
    update,
    delete: del,
    checkCommentExist,
    checkCommentator,
} = require("../controllers/comments");

const { secret } = require("../config");

// 认证中间件
const auth = jwt({ secret });

// 获取评论列表
router.get("/", find);

// 增加评论
router.post("/", auth, create);

// 获取特定评论
router.get("/:id", checkCommentExist, findById);

// 修改特定评论
router.patch("/:id", auth, checkCommentExist, checkCommentator, update);

// 删除评论
router.delete("/:id", auth, checkCommentExist, checkCommentator, del);

module.exports = router;
