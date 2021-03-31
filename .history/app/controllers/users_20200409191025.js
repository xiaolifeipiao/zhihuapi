const db = [ {name: "江小白"}];
class UsersCtl{
    // 获取用户
    find(ctx){
        a.b
        ctx.body = db;
    }
    // 获取特定用户
    finById(ctx){
        if(ctx.params.id*1>=db.length){
            ctx.throw(412);
        }
        ctx.body = db[ctx.params.id*1];
    }
    // 创建用户
    create(ctx){
        ctx.verifyParams({
            name:{type: 'string', required: true},
            age:{type: 'number', required:true}
        })
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    // 更新用户
    update(ctx){
        db[ctx.params.id*1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    // 删除用户
    delete(ctx){
        db.splice(ctx.params.id*1,1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();