import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    viewedProfile: {
        type: Number,
    },
    impressions: {
        type: Number,
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;