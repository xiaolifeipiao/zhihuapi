const Koa  = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./routes');
const app  = new Koa();

app.use(async(ctx,next)=>{
    try{
        await next();
    }catch(err){
        ctx.status = err.status || err.statusCode;
        ctx.body = {
            message: err.message
        }
    }
});

app.use(bodyparser());
routing(app);
app.listen(3000,()=>{
    console.log("程序启动 在3000端口");
});