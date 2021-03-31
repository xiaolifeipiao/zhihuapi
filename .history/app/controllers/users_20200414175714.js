const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const { secret } = require("../config");
class UsersCtl {
    // 获取用户
    async find(ctx) {
        const { per_Page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_Page * 1, 1);
        ctx.body = await User.find({ name: new RegExp(ctx.query.q) })
            .limit(perPage)
            .skip(page * perPage);
    }
    // 获取特定用户
    async finById(ctx) {
        // 字段过滤?fields=educations;business;
        const { fields = "" } = ctx.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((item) => `+${item} `)
            .join("");
        const populateStr = fields
            .split(";")
            .filter((f) => f)
            .map((f) => {
                if (f === "employments") {
                    return "employments.company employments.job";
                }
                if (f === "educations") {
                    return "educations.school education.major";
                }
                return f;
            })
            .join(" ");
        // console.log(selectFields);
        const user = await User.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
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
    // 获取关注
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id)
            .select("+following")
            .populate("following");
        if (!user) {
            ctx.throw(404, "没得关注");
        }
        ctx.body = user.following;
    }
    //获取粉丝
    async listFollower(ctx) {
        const users = await User.find({ following: ctx.params.id });
        ctx.body = users;
    }

    // 检查用户与否
    async checkUserExist(ctx, next) {
        const user = await User.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        await next();
    }
    // 关注
    async follow(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        if (!me.following.map((id) => id.toString()).includes(ctx.params.id)) {
            me.following.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }
    // 取消关注
    async unfollow(ctx) {
        const me = await User.findById(ctx.state.user._id).select("+following");
        const index = me.following
            .map((id) => id.toString())
            .indexOf(ctx.params.id);
        if (index > -1) {
            me.following.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }

    // 关注话题
    async followTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select(
            "+followingTopics"
        );
        if (
            !me.followingTopics
                .map((id) => id.toString())
                .includes(ctx.params.id)
        ) {
            me.followingTopics.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
    }
    // 取消关注话题
    async unfollowTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select(
            "+followingTopics"
        );
        const index = me.followingTopics
            .map((id) => id.toString())
            .indexOf(ctx.params.id);
        if (index > -1) {
            me.followingTopics.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
    // 获取关注话题
    async listFollowingTopics(ctx) {
        const user = await User.findById(ctx.params.id)
            .select("+followingTopics")
            .populate("followingTopics");
        if (!user) {
            ctx.throw(404, "没得关注");
        }
        ctx.body = user.followingTopics;
    }
    //获取粉丝话题
    async listFollowerTopics(ctx) {
        const users = await User.find({ followingTopics: ctx.params.id });
        ctx.body = users;
    }
    //列出问题
    async listQuestions(ctx) {
        const question = await Question.find({ questioner: ctx.params.id });
        ctx.body = question;
    }
    //列出答案点赞的列表
    async listLikingAnswers(ctx) {
        const user = await User.findById(ctx.params.id)
            .select("+likingAnswers")
            .populate("likingAnswers");
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = user.likingAnswers;
    }
    // 喜欢的答案
    async likingAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select(
            "+likingAnswers"
        );
        if (
            !me.likingAnswers.map((id) => id.toString()).includes(ctx.params.id)
        ) {
            me.likingAnswers.push(ctx.params.id);
            me.save();
            await Answer.findByIdAndUpdate(ctx.params.id, {
                $inc: { voteCount: 1 },
            });
        }
        ctx.status = 204;
        await next();
    }
    // 取消喜欢答案
    async unlikeAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select(
            "+likingAnswers"
        );
        const index = me.likingAnswers
            .map((id) => id.toString())
            .indexOf(ctx.params.id);
        if (index > -1) {
            me.likingAnswers.splice(index, 1);
            me.save();
            await Answer.findByIdAndUpdate(ctx.params.id, {
                $inc: { voteCount: -1 },
            });
        }
        ctx.status = 204;
    }
    //列出不认同的列表（踩）
    async listDisLikingAnswers(ctx) {
        const user = await User.findById(ctx.params.id)
            .select("+dislikingAnswers")
            .populate("dislikingAnswers");
        if (!user) {
            ctx.throw(404, "用户不存在");
        }
        ctx.body = user.dislikingAnswers;
    }
    // 喜欢的答案
    async dislikingAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select(
            "+dislikingAnswers"
        );
        if (
            !me.dislikingAnswers
                .map((id) => id.toString())
                .includes(ctx.params.id)
        ) {
            me.dislikingAnswers.push(ctx.params.id);
            me.save();
        }
        ctx.status = 204;
        await next();
    }
    // 取消喜欢答案
    async undislikeAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select(
            "+dislikingAnswers"
        );
        const index = me.dislikingAnswers
            .map((id) => id.toString())
            .indexOf(ctx.params.id);
        if (index > -1) {
            me.dislikingAnswers.splice(index, 1);
            me.save();
        }
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();
