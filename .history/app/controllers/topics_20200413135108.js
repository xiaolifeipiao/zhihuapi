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
            .map((f) => `+${item} `);
    }
}

module.exports = new TopicsCtl();
