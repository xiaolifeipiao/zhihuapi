// 读取router下的目录并批量注册路由
const fs = require('fs');
module.exports = (app) =>{
    fs.readFileSync(__dirname).forEach(file=>{
        if(file === 'index.js'){  return;}
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    })
}