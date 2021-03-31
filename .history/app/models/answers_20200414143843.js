const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const answerSchema = new Schema({
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    answerer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topics: {
        type: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
        select: false,
    },
});

module.exports = model("Answer", answerSchema);
