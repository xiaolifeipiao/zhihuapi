const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionsSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    description: { type: String },
    questioner: { type: Schema.Types.ObjectId, ref: "User", select: false },
    topics: {
        type: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
        select: false,
    },
});

module.exports = model("Question", questionsSchema);
