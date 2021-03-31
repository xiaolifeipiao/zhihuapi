const Koa  = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./routes');
const app  = new Koa();


// 洋葱模型
app.use(async(ctx,next)=>{
    console.log(1);
    await next();
    console.log(2);
    ctx.body = "Hellow world API";
});
app.use(async(ctx,next)=>{
    console.log(3)
    await next();
    console.log(4);
});
app.use(async(ctx)=>{
    console.log(5)
})

app.use(bodyparser());
routing(app);
app.listen(3000);