const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require("koa-jwt");
const router = new Router({ prefix: "/users" });
const {
    find,
    finById,
    create,
    update,
    delete: del,
    login,
    checkOwner,
    listFollowing,
    follow,
    unfollow,
    listFollower,
    checkUserExist,
    followTopic,
    unfollowTopic,
    listFollowingTopics,
    listFollowerTopics,
    listQuestions,
    listLikingAnswers,
    likingAnswer,
    unlikeAnswer,
    listDisLikingAnswers,
    dislikeAnswer,
    undislikeAnswer,
    listCollectAnswers,
    collectAnswer,
    uncollectAnswer,
} = require("../controllers/users");

const { secret } = require("../config");
const { checkTopicExist } = require("../controllers/topics");
const { checkAnswerExist } = require("../controllers/answers");

//手写 认证
// const  auth= async(ctx,next) =>{
//     const {authorization= ''} = ctx.request.header;
//     // authorization中Bearer有一个空格
//     // const token = authorization.split(' ')[1];
//     const token = authorization.replace('Bearer ','');
//     console.log(token);
//     try{
//         const user = jsonwebtoken.verify(token,secret);
//         ctx.state.user = user;
//     }catch(err){
//         ctx.throw(401,err.message);
//     }
//     await next();
// }
// 中间件koa-jwt认证
const auth = jwt({ secret });
// 获取用户
router.get("/", find);
// 创建用户
router.post("/", create);
//查找特定用户
router.get("/:id", finById);
//更新用户信息
router.patch("/:id", auth, checkOwner, update);
//删除用户
router.delete("/:id", auth, checkOwner, del);
//登录
router.post("/login", login);
// 获取关注
router.get("/:id/following", listFollowing);
//获取粉丝
router.get("/:id/follower", listFollower);
// 关注某人
router.put("/following/:id", auth, checkUserExist, follow);
// 取消关注
router.delete("/following/:id", auth, checkUserExist, unfollow);
// 关注话题
router.put("/followingTopics/:id", auth, checkTopicExist, followTopic);
// 取消话题
router.delete("/followingTopics/:id", auth, checkTopicExist, unfollowTopic);
// 获取用户关注话题
router.get("/:id/followingTopics", listFollowingTopics);
// 获取关注粉丝;
router.get("/:id/FollowerTopics", checkTopicExist, listFollowerTopics);
// 获取问题列表
router.get("/:id/questions", listQuestions);
// 列出喜欢的答案
router.get("/:id/likingAnswers", listLikingAnswers);
//赞
router.put(
    "/likingAnswers/:id",
    auth,
    checkAnswerExist,
    likingAnswer,
    undislikeAnswer
);
// 取消赞
router.delete("/likingAnswers/:id", auth, checkAnswerExist, unlikeAnswer);
// 列出踩的答案
router.get("/:id/dislikingAnswers", listDisLikingAnswers);
//踩
router.put(
    "/dislikingAnswers/:id",
    auth,
    checkAnswerExist,
    dislikeAnswer,
    unlikeAnswer
);
// 取消踩
router.delete("/dislikingAnswers/:id", auth, checkAnswerExist, undislikeAnswer);
// 获取收藏答案列表
router.get("/:id/collectAnswers", listCollectAnswers);

// 收藏答案
router.put("/collectAnswers/:id", auth, checkAnswerExist, collectAnswer);

// 取消收藏答案
router.delete("/collectAnswers/:id", auth, checkAnswerExist, uncollectAnswer);

module.exports = router;
