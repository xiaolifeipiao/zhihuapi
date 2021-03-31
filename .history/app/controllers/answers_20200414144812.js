const Answer = require("../models/answers");
class AnswersCtl {
    // 获取话题
    async find(ctx) {
        // 分页
        const { per_Page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_Page * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await Answer.find({
            content: q,
            questionId: ctx.params.questionId,
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
        const answer = await Answer.findById(ctx.params.id)
            .select(selectFields)
            .populate("answerer");
        if (!answer) {
            ctx.throw(404, "话题不存在");
        }
        ctx.body = answer;
    }
    // 创建话题
    async create(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: true },
            description: { type: "string", required: false },
        });
        const answerer = ctx.state.user._id;
        const { questionId } = ctx.params;
        const answer = await new Answer({
            ...ctx.request.body,
            answerer,
            questionId,
        }).save();
        ctx.body = answer;
    }
    // 更新话题
    async update(ctx) {
        ctx.verifyParams({
            title: { type: "string", required: false },
            description: { type: "string", required: false },
        });
        await ctx.state.Answer.update(ctx.request.body);
        ctx.body = ctx.state.Answer;
    }
    // 检查用户话题与否
    async checkAnswerExist(ctx, next) {
        const answer = await Answer.findById(ctx.params.id).select("+answerer");
        if (!answer) {
            ctx.throw(404, "答案不存在");
        }
        if (answer.questionId !== ctx.params.questionId) {
            ctx.throw(404, "该问题下没得答案");
        }
        ctx.state.answer = answer;
        await next();
    }
    async checkAnswerer(ctx, next) {
        const { Answer } = ctx.state;
        if (Answer.Answerer.toString() !== ctx.state.user._id) {
            ctx.throw(403, "没有权限");
        }
        await next();
    }
    // 删除
    async delete(ctx) {
        await Answer.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}

module.exports = new AnswersCtl();
