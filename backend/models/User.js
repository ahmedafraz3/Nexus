const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensure the email is unique
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: String,
    otpExpires: Date,
}, { timestamps: true });

// Create indexes for faster querying
userSchema.index({ email: 1 });
userSchema.index({ userName: 1 });

module.exports = mongoose.model('User', userSchema);
