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
} = require("../controllers/users");

const { secret } = require("../config");

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
router.delete("/following/:id", auth, unfollow);

module.exports = router;
