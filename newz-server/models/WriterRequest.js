import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        required: [true, "Please enter your request message"],
        minlength: [15, "Message must be at least 15 characters"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const WriterRequest = mongoose.model("WriterRequest", schema);