const Router = require("koa-router");
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const router  = new Router({prefix: '/users'});
const { find, finById, create, update, delete:del,
login,checkOwner
}  =require('../controllers/users');

const {secret} = require('../config');

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
const auth = jwt({secret});


router.get('/',find);

router.post('/',create);

router.get('/:id',finById);

router.patch('/:id',auth,checkOwner,update);

router.delete('/:id',auth,checkOwner,del);

router.post('/login',login);

module.exports = router;