const Koa  = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./routes');
const error = require('koa-json-error');
const app  = new Koa();



// 手写中间件处理错误
app.use(async(ctx,next)=>{
    try{
        await next();
    }catch(err){
        ctx.status = err.status || err.statusCode || 500;
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