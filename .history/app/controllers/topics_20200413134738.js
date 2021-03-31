const Topics = require("../models/topics");
class TopicsCtl {
    async find(ctx) {
        ctx.body = await Topics.find();
    }
}

module.exports = new TopicsCtl();
