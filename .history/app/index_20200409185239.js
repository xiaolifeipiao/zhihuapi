const Koa  = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./routes');
const error = require('koa-json-error');
const parameter = request('koa-parameter');
const app  = new Koa();

// 插件koa-json-error的用法
app.use(error({
    // 判断生产环境变量，生产输出stack，不是不输出
    postFormat:(e,{stack,...rest})=>process.env.NODE_ENV === 'production' ? rest:{stack,...rest}
}));

// 手写中间件处理错误
// app.use(async(ctx,next)=>{
//     try{
//         await next();
//     }catch(err){
//         ctx.status = err.status || err.statusCode || 500;
//         ctx.body = {
//             message: err.message
//         }
//     }
// });

app.use(bodyparser());
routing(app);
app.listen(3000,()=>{
    console.log("程序启动 在3000端口");
});