const User = require('../models/users');
class UsersCtl{
    // 获取用户
    async find(ctx){
        ctx.body = await User.find();
    }
    // 获取特定用户
    async finById(ctx){
        let user =await User.findById(ctx.params.id);
        if(!user){ctx.throw(404,'用户不存在');}
        ctx.body = user;
    }
    // 创建用户
    async create(ctx){
        ctx.verifyParams({
            name:{type: 'string', required: true},
        });
       let user= await new User(ctx.request.body).save();
        ctx.body = user;
    }
    // 更新用户
    async update(ctx){
        ctx.verifyParams({
            name:{type: 'string', required: true},
        });
    }
    // 删除用户
    delete(ctx){
        db.splice(ctx.params.id*1,1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();