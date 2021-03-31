const Router = require("koa-router");
const router  = new Router({prefix: '/users'});
const { find, finById, create, update, delete:del,
login
}  =require('../controllers/users');


// 认证
const auth = async() =>{
    const {authorization= ''} = ctx.request.header;
}

router.get('/',find);

router.post('/',create);

router.get('/:id',finById);

router.patch('/:id',update);

router.delete('/:id',del);

router.post('/login',login);

module.exports = router;