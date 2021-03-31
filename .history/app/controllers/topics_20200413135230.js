const Topics = require("../models/topics");
class TopicsCtl {
    async find(ctx) {
        ctx.body = await Topics.find();
    }
    async findById(ctx) {
        const { fields } = ctx.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((item) => `+${item} `);
        const topic = await Topics.findById(ctx.params.id).select(selectFields);
    }
}

module.exports = new TopicsCtl();
