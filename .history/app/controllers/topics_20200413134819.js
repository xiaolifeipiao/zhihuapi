const Topics = require("../models/topics");
class TopicsCtl {
    async find(ctx) {
        ctx.body = await Topics.find();
    }
    async findById(ctx) {
        const { fields } = ctx.query;
    }
}

module.exports = new TopicsCtl();
