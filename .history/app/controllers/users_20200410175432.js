const User = require('../models/users');
class UsersCtl{
    // 获取用户
    async find(ctx){
        ctx.body = await User.find();
    }
    // 获取特定用户
    async finById(ctx){
        let user =await User.findById(ctx.params.id);
        if(!user){ctx.throw(404,'用户不存在')}
    }
    // 创建用户
    create(ctx){
        ctx.verifyParams({
            name:{type: 'string', required: true},
            age:{type: 'number', required:false}
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