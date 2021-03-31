const Question = require("../models/questions");
class QuestionsCtl {
    // 获取话题
    async find(ctx) {
        // 分页
        const { per_Page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_Page * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await Question.find({
            $or: [{ title: q }, { description: q }],
        })
            .limit(perPage)
            .skip(page * perPage);
    }
    // 获取指定话题
    async findById(ctx) {
        const { fields = "" } = ctx.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((item) => `+${item} `)
            .join("");
        console.log(selectFields);
        const question = await Question.findById(ctx.params.id).select(
            selectFields
        );
        ctx.body = question;
    }
    // 创建话题
    async create(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: true },
            description: { type: "string", required: false },
        });
        const question = await new Question({
            ...ctx.request.body,
            questioner: ctx.state.user_id,
        }).save();
        ctx.body = question;
    }
    // 更新话题
    async update(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: false },
            description: { type: "string", required: false },
        });
        await ctx.state.question.update(ctx.request.body);
        ctx.body = ctx.state.question;
    }
    // 检查用户话题与否
    async checkQuestionExist(ctx, next) {
        const question = await Question.findById(ctx.params.id).select(
            "+questioner"
        );
        if (!question) {
            ctx.throw(404, "问题不存在");
        }
        ctx.state.question = question;
        await next();
    }
    async checkQuestioner(ctx, next) {
        const { question } = ctx.state;
        console.log(question);
        console.log(ctx.state.user_id);
        if (question.questioner.toString() !== ctx.state.user_id) {
            ctx.throw(403, "没有权限");
        }
        await next();
    }
    // 删除
    async delete(ctx) {
        await Question.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}

module.exports = new QuestionsCtl();
