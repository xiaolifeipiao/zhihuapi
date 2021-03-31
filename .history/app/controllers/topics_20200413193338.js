const Topics = require("../models/topics");
class TopicsCtl {
    // 获取话题
    async find(ctx) {
        ctx.body = await Topics.find();
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
        const topic = await Topics.findById(ctx.params.id).select(selectFields);
        ctx.body = topic;
    }
    // 创建话题
    async create(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: true },
            avatar_url: { type: "string", required: false },
            introduction: { type: "string", required: false },
        });
        const topic = await new Topics(ctx.request.body).save();
        ctx.body = topic;
    }
    async update(ctx) {
        ctx.verifyParams({
            name: { type: "string", required: false },
            avatar_url: { type: "string", required: false },
            introduction: { type: "string", required: false },
        });
        const topic = await Topics.findByIdAndUpdate(
            ctx.params.id,
            ctx.request.body
        );
        ctx.body = topic;
    }
}

module.exports = new TopicsCtl();
