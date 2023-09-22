import mongoose from "mongoose";
import validator from 'validator';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [50, "Name can't exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Invalid email format"],
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