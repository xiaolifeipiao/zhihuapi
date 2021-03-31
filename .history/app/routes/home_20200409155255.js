const Router = require("koa-router");
const router  = new Router();


router.get('/',(ctx)=>{
    ctx.body = "<h1>这是主页</h1>"
})