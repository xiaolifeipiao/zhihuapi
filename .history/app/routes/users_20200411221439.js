const Router = require("koa-router");
const jsonwebtoken = require('jsonwebtoken');
const router  = new Router({prefix: '/users'});
const { find, finById, create, update, delete:del,
login
}  =require('../controllers/users');

const {secret} = require('../config');

// 认证
const  auth= async(ctx,next) =>{
    const {authorization= ''} = ctx.request.header;
    const token = authorization.replace('Bearer','');
    console.log(token);
    try{
        const user = jsonwebtoken.verify(token,secret);
        console.log(user);
        ctx.state.user = user;
    }catch(err){
        ctx.throw(401,err.message);
    }
    await next();
}

router.get('/',find);

router.post('/',create);

router.get('/:id',finById);

router.patch('/:id',auth,update);

router.delete('/:id',auth,del);

router.post('/login',login);

module.exports = router;