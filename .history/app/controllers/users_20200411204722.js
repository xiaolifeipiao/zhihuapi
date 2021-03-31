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
            password:{type:'string',required:true}
        });
       let user= await new User(ctx.request.body).save();
        ctx.body = user;
    }
    // 更新用户
    async update(ctx){
        ctx.verifyParams({
            name:{type: 'string', required: false},
            password:{type:'string',required:false}
        });
        const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body);
        if(!user){ctx.throw(404,'用户不存在');}
        ctx.body = user;
    }
    // 删除用户
    async delete(ctx){
        const user = await User.findByIdAndRemove(ctx.params.id);
        if(!user){ctx.throw(404,'用户不存在');}
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();