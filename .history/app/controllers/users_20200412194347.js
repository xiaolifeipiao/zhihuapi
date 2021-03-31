const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const { secret } = require("../config");
class UsersCtl {
    // 获取用户
    async find(ctx) {
        ctx.body = await User.find();
    }
    // 获取特定用户
    async finById(ctx) {
        // 字段过滤?fields=educations;business;
        const { fields } = ctx.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((item) => `+${item} `)
            .join("");
        // console.log(selectFields);
        let user = await User.findById(ctx.params.id).select(selectFields);
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = user;
    }
    // 创建用户
    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: "string",
                required: true,
            },
            password: {
                type: "string",
                required: true,
            },
        });
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        // 409冲突，已存在
        if (repeatedUser) {
            ctx.throw(409, "用户已经存在");
        }
        let user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, "没有权限");
        }
        await next();
    }
    // 更新用户
    async update(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: false },
            password: { type: "string", required: false },
            avatar_url: { type: "string", required: false },
            gender: { type: "string", required: false },
            headline: { type: "string", required: false },
            locations: { type: "array", itemType: "string", required: false },
            business: { type: "string", required: false },
            employments: { type: "array", itemType: "object", required: false },
            eductions: { type: "array", itemType: "object", required: false },
        });
        const user = await User.findByIdAndUpdate(
            ctx.params.id,
            ctx.request.body
        );
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = user;
    }
    // 删除用户
    async delete(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.status = 204;
    }
    // 登录
    async login(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true },
            password: { type: "string", required: true },
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) {
            ctx.throw(401, "用户名或密码不正确");
        }
        const { _id, name } = user;
        const token = jsonwebtoken.sign({ _id, name }, secret, {
            expiresIn: "1d",
        });
        ctx.body = { token };
    }
}

module.exports = new UsersCtl();
