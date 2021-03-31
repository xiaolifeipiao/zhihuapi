const Comment = require("../models/comments"); // 数据库模型导出

class CommentsCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(+ctx.query.page, 1) - 1;
        const perPage = Math.max(+ctx.query.per_page, 1);
        const q = new RegExp(ctx.query.q);
        const { questionId, answerId } = ctx.params;
        ctx.body = await Comment.find({ content: q, questionId, answerId })
            .limit(perPage)
            .skip(page * perPage)
            .populate("commentator"); // limit: 返回多少数量，skip：跳过多少数量
    }

    async findById(ctx) {
        const { fields = "" } = ctx.query;
        const selectFields = fields
            .split(";")
            .filter((item) => item)
            .map((item) => " +" + item)
            .join("");
        const comment = await Comment.findById(ctx.params.id)
            .select(selectFields)
            .populate("commentator"); // populate的内容也会变成select，也就是会被返回回去
        if (!comment) ctx.throw(404, "评论不存在");
        ctx.body = comment;
    }

    async create(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: true },
        });

        const commentator = ctx.state.user._id;
        const { questionId, answerId } = ctx.params;
        const comment = await new Comment({
            ...ctx.request.body,
            commentator,
            questionId,
            answerId,
        }).save();
        ctx.body = comment;
    }

    async update(ctx) {
        ctx.verifyParams({
            content: { type: "string", required: false },
        });

        await ctx.state.comment.update(ctx.request.body);
        ctx.body = ctx.state.comment;
    }

    async delete(ctx) {
        await Comment.findByIdAndRemove(ctx.params.id);
        ctx.status = 204; // 没有内容，但是成功了
    }

    async checkCommentExist(ctx, next) {
        const comment = await Comment.findById(ctx.params.id).select(
            "+commentator"
        );
        if (!comment) ctx.throw(404, "评论不存在");
        if (
            ctx.params.questionId &&
            comment.questionId !== ctx.params.questionId
        )
            ctx.throw(404, "该问题下没有此评论");
        if (ctx.params.answerId && comment.answerId !== ctx.params.answerId)
            ctx.throw(404, "该评论下没有此评论");

        ctx.state.comment = comment;
        await next();
    }

    async checkCommentator(ctx, next) {
        const { comment } = ctx.state;
        if (comment.commentator.toString() !== ctx.state.user._id)
            ctx.throw(403, "没有权限");
        await next();
    }
}

module.exports = new CommentsCtl();
