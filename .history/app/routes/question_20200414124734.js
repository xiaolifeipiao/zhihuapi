const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require("koa-jwt");
const router = new Router({ prefix: "/questions" });
const { secret } = require("../config");
const {
    find,
    findById,
    create,
    update,
    delete: del,
    checkQuestionExist,
    checkQuestioner,
} = require("../controllers/questions");
const auth = jwt({ secret });

router.get("/", find);
router.post("/", auth, create);
router.get("/:id", checkQuestionExist, findById);
router.patch("/:id", auth, checkTopicExist, update);

module.exports = router;
