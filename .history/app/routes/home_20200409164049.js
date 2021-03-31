const Router = require("koa-router");
const router  = new Router();
const {index} = require('../controllers/home');


router.get('/',(ctx)=>{
    ctx.body = "<h1>这是主页</h1>";
})

module.exports = router;