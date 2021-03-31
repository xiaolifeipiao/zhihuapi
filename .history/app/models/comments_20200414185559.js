const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    ___v: { type: Number, select: false },
    content: { type: String, required: true },
    commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
    questionId: { type: String, select: true },
    answerId: { type: String, select: true }
    },
    questionId: { type: String, select: true },
    // 投票数
    voteCount: { type: Number, required: true, default: 0 },
});

module.exports = model("Comment", commentSchema);
