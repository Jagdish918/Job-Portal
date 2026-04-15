import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);
