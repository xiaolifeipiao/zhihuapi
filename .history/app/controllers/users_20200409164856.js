class UsersCtl{
    // 获取用户
    find(ctx){
        ctx.body = db;
    }
    // 获取特定用户
    finById(ctx){}
    // 创建用户
    create(ctx){}
    // 更新用户
    update(ctx){}
    // 删除用户
    delete(ctx){}
}

module.exports = new UsersCtl();