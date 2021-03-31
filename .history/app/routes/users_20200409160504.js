const Router = require("koa-router");
const router  = new Router({prefix: '/users'});

router.get('/',(ctx)=>{
    ctx.body = db;
});

router.post('/',(ctx)=>{
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
});

router.get('/:id',(ctx)=>{
    ctx.body = db[ctx.params.id*1];
});

router.put('/:id',(ctx)=>{
    db[ctx.params.id*1] = ctx.request.body;
    ctx.body = ctx.request.body;
});

router.get('/:id',(ctx)=>{
    ctx.body = db[ctx.params.id*1];
});

router.delete('/:id',(ctx)=>{
    db.splice(ctx.params.id*1,1);
    ctx.status = 204;
});
module.exports = router;