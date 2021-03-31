const Router = require("koa-router");
const router  = new Router({prefix: '/users'});

router.get('/',(ctx)=>{
    ctx.body = db;
});

router.post('/',(ctx)=>{
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
});