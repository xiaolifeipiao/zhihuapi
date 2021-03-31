const path  =require('path');
class HomeCtl{
    index(ctx){
        ctx.body = "<h1>这是主页</h1>";
    }
    upload(ctx){
        const file = ctx.request.files.file;
        // 获取uploads下的图片路径
        const basename = path.basename(file.path);
        // console.log(basename);
        // 获取主机http://localhost:3000
        console.log(ctx.origin);
        ctx.body = {url:`${ctx.origin}/uploads/${basename}`};
    }
}

module.exports = new HomeCtl();