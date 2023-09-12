import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter news title"],
        minlength: [4, "Title must be at least 4 characters"],
        maxlength: [200, "Title can't exceed 200 characters"],
    },
    content: {
        type: String,
        required: [true, "Please enter news content"],
        minlength: [20, "Content must be at least 20 characters"],
    },
    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const News = mongoose.model("News", schema);